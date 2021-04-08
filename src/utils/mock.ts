import * as path from "path";
import * as http from 'http';
import url from 'url';
import { files } from "node-dir";
import { ViteDevServer, Plugin, Connect } from 'vite';

// const mockDir = path.resolve(__dirname, './mock');
const mockDir = path.resolve(__dirname, '../../mock');

/**
 * 解析post请求参数
 * @param req - 请求对象
 */
export function bodyParse(req: Connect.IncomingMessage) {
    return new Promise(resolve => {
      let data = ''
      let jsonStr = '';
      req.on('data', chunk => {
        data += chunk
      })
      req.on('end', () => {
        try {
            jsonStr = JSON.parse(data);
        } catch (err) {
            jsonStr = '';
        }
        resolve(jsonStr);
      })
    })
}

/**
 * 删除 mock 文件缓存
 * @author LiQingSong
 */
export function unRegisterMock(mockDirPath: string = mockDir) {
    Object.keys(require.cache).forEach(i => {
      if (i.includes(mockDirPath)) {
        delete require.cache[require.resolve(i)]
      }
    })
}

/**
 * 加载所有mock文件内容
 * @author LiQingSong
 */
export function loadAllMock(mockDirPath: string = mockDir) {
    const mocks:any = [];
    const data = files(mockDirPath, {
      sync: true
    })
    .filter(function(file) {
      return file.match(/\.js$/)
    })
    .map(function(file) {
        // console.log('.....file....', file);
        try {
            return require(file);
        } catch (error) {
            console.log('>>> mock ', error)            
        }        
    });

   for (let index = 0, len = data.length; index < len; index++) {
       const item = data[index];
       for(let key  in item){
            const keys = key.replace(/(^\s*)|(\s*$)/g, '').split(' ');
            let ajaxType: string = 'get';
            let ajaxUrl: string = '';
            if(keys.length<2) {
                ajaxUrl = keys[0];
            } else {
                ajaxType = keys[0].toLowerCase();
                ajaxUrl = keys[1];
                if(!['get','post','put','patch','delete','head','options'].includes(ajaxType)) {
                    ajaxType = 'get';
                }
            }
            if(typeof item[key] === 'function') {
                mocks[ajaxType + ' ' + ajaxUrl] = item[key];
            }
            
        }     
   }

   return mocks;
}

/**
 * Mock Vite Plugin
 * @author LiQingSong
 */
export function vitePluginMock(): Plugin {

    let mocksCache = loadAllMock();

    return {
        name: 'vite-plugin-mock',
        configureServer(server: ViteDevServer) { 
            server.watcher.on("all",(eventName, filePath)=> {
                if (eventName === 'change' || eventName === 'add' || eventName === 'unlink') {
                    try {
                        if(filePath.replace(mockDir, '') !== filePath) {
                            unRegisterMock();
                            mocksCache = loadAllMock();
                            server.config.logger.info(`  >>> Mock Server hot reload success! changed  ${filePath}`);
                        }
                    } catch(error) {
                        server.config.logger.error(`  >>> Mock Server hot reload error! ${error}`);
                    }
                }                
            });
            server.middlewares.use(async (req: Connect.IncomingMessage ,res: http.ServerResponse, next: Connect.NextFunction)=> {    
                
                if(req.url && req.method) {
                    const reqMethod: string = req.method.toLowerCase();
                    const queryParams: url.UrlWithParsedQuery = url.parse(req.url,true);                   
                    const reqUrl: string = reqMethod!=='get' ? req.url : (queryParams.pathname || '');                   
                    const reqQuery: {[key: string]: any;} = queryParams.query || {};
                    const reqBody: unknown = reqMethod ==='post' ? await bodyParse(req) : {} ;

                    if(mocksCache[`${reqMethod} ${reqUrl}`]) {
                        mocksCache[`${reqMethod} ${reqUrl}`]({ 
                            headers: req.headers, 
                            body: reqBody, 
                            query: reqQuery
                        }, { 
                            send: (data: any, statusCode: number = 200)=> {
                                res.setHeader('Content-Type', 'application/json');
                                res.statusCode = statusCode;
                                res.end(JSON.stringify(data));
                            }
                        })
                        return;
                    }   
                    
                    const reqUrlEndAsterisk: string = reqUrl.substring(0, reqUrl.lastIndexOf('/')) + '/*';
                    if(mocksCache[`${reqMethod} ${reqUrlEndAsterisk}`]) {
                        mocksCache[`${reqMethod} ${reqUrlEndAsterisk}`]({ 
                            headers: req.headers, 
                            body: reqBody, 
                            query: reqQuery
                        }, { 
                            send: (data: any, statusCode: number = 200)=> {
                                res.setHeader('Content-Type', 'application/json');
                                res.statusCode = statusCode;
                                res.end(JSON.stringify(data));
                            }
                        })
                        return;
                    }

                } 
        
                next();
    
            })
        }
    }
}