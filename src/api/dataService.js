import service from "@/utils/request";
import { getRsaPassWord } from "@/utils/passWordRsa";
export const getLayerList = (params) => {
  return service({
    url: "/mapdata/api/v1/layers",
    method: "get",
    params,
  });
};

// 遥感影像数据
export const getRemoteSensingImages = (params) => {
  return service({
    url: "/maptilecache/api/v1/layers",
    method: "get",
    params
  });
};

export const getStylesData = (params) => {
  return service({
    url: "/mapdata/api/v1/styles",
    method: "get",
    params
  });
};
export async function jwtToken() {
  console.log('-ddddddddddd-----')
  const data = await service.get('/user/jwt/time')
  const response = await service.post(
    '/user/jwt/token',
    {
      username: 'admin',
      password: getRsaPassWord(data + 'gserver')
    })
  const token = response.token
  localStorage.setItem('token', token)
  service.defaults.headers.common['Authorization'] = token
  return token
}


// 查询图层详情（按照名称）
export const getLayerDetail = (layerName) => {
  return service({
    url: `/mapdata/api/v1/layers/name/${layerName}`,
  });
};

// 更新图层样式
export const updateLayerStyle = ( params) => {
  return service({
    url: `/mapdata/api/v1/layers/styles`,
    method: "put",
    data: params,
  });
};

// 按图层编码查询图层
export const getLayerByCode = (id) => {
  return service({
    url: `/mapdata/api/v1/layers/${id}`,
  });
};
