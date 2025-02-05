 const url = 'http://221.228.236.94:8023/api'

const locationImg=[
    { title: 'TMS', children: [{ label: '基础地址', value: url+'/maptilecache/service/tms/1.0.0/_LayerName@EPSG:4326@png' ,show:true,name:'',type:'Img'}] },
    {
        title: 'WMS', children: [
            { label: '基础地址', value:  url+'/maptilecache/service/wms?layer=_LayerName&TILED=true',show:true,name:'',type:'Img' },
            { label: 'GetCapabilities示例', value:  url+'/maptilecache/service/wms?layer=_LayerName&service=WMS&version=1.1.1&request=GetCapabilities',show:false,name:'',type:'Img' }
        ]
    },
    {
        title: 'WMTS', children: [
            { label: '基础地址', value:  url+'/maptilecache/service/wmts?layer=_LayerName',show:true,name:'',type:'Img'},
            { label: 'GetCapabilities示例', value:  url+'/maptilecache/service/wmts?layer=_LayerName&service=WMTS&request=GetCapabilities' ,show:false,name:'',type:'Img'}
        ]
    },
    {
        title: 'GS iExplorer', children: [{ label: 'gserver Adapter', value: '{"id":8,"layerName":"_LayerName","layerType":"IMAGELAYER","isBase":true,"tileStatus":"SUCCESS","minX":113.48876953125,"minY":22.08251953125,"maxX":113.62060546875,"maxY":22.236328125,"minLevel":10,"maxLevel":13,"mimeType":"PNG","gridSet":"EPSG:4326","partialUpdate":false,"isEncrypt":false,"publishTime":"2022-07-26 01:03:43","storageType":"TIF","dmFilePath":"/home/gserver/service-data/datamanager/realfile/0a7ef16decc7c48ccc2ad680f47a148f_Macao_2012.tif","userId":"0","operation":1}' ,show:false,name:'',type:'Img'}]
    }
]

export function getLocation(layerName) {
    const list = JSON.parse(JSON.stringify(locationImg))
    list.forEach(item => {
        item.children.forEach(child => {
            child.value = child.value.replace('_LayerName', layerName)
            child.name = layerName
        })
    });
    return list
}


const locationVector=[
    { title: 'TMS', children: [{ label: '基础地址', value: url+'/maptilecache/service/tms/1.0.0/_LayerName@EPSG:4326@png' ,show:true,name:'',type:'vector'}] },
    {
        title: 'WMS', children: [
            { label: '基础地址', value:  url+'/maptilecache/service/wms?layer=_LayerName&TILED=true',show:true,name:'',type:'vector' },
            { label: 'GetCapabilities示例', value:  url+'/maptilecache/service/wms?layer=_LayerName&service=WMS&version=1.1.1&request=GetCapabilities',show:false,name:'',type:'vector' }
        ]
    },
    {
        title: 'WMTS', children: [
            { label: '基础地址', value:  url+'/maptilecache/service/wmts?layer=_LayerName',show:true,name:'',type:'vector'},
            { label: 'GetCapabilities示例', value:  url+'/maptilecache/service/wmts?layer=_LayerName&service=WMTS&request=GetCapabilities' ,show:false,name:'',type:'vector'}
        ]
    },
    {
        title: 'WFS', children: [
            { label: '基础地址', value:  url+'/maptilecache/service/wmts?layer=_LayerName',show:true,name:'',type:'vector'},
            { label: 'GetCapabilities示例', value:  url+'/maptilecache/service/wmts?layer=_LayerName&service=WMTS&request=GetCapabilities' ,show:false,name:'',type:'vector'}
        ]
    },
    {
        title: 'GS iExplorer', children: [{ label: 'gserver Adapter', value: '{"id":8,"layerName":"_LayerName","layerType":"IMAGELAYER","isBase":true,"tileStatus":"SUCCESS","minX":113.48876953125,"minY":22.08251953125,"maxX":113.62060546875,"maxY":22.236328125,"minLevel":10,"maxLevel":13,"mimeType":"PNG","gridSet":"EPSG:4326","partialUpdate":false,"isEncrypt":false,"publishTime":"2022-07-26 01:03:43","storageType":"TIF","dmFilePath":"/home/gserver/service-data/datamanager/realfile/0a7ef16decc7c48ccc2ad680f47a148f_Macao_2012.tif","userId":"0","operation":1}' ,show:false,name:'',type:'vector'}]
    }
]

export function getLocationVector(layerName) {
    const list = JSON.parse(JSON.stringify(locationVector))
    list.forEach(item => {
        item.children.forEach(child => {
            child.value = child.value.replace('_LayerName', layerName)
            child.name = layerName
        })
    });
    return list
}

