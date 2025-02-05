import { ref } from 'vue'
import * as maptalks from 'maptalks'

let layerVector = ref(null) // 矢量图层
let layerImg = ref(null)
const url = import.meta.env.VITE_BASE_API
export function useAddLayer() {
  // 添加矢量图层 (WMS)
  function addVectorLayer(layerName) {
    removeVectorLayer()
    try {
      console.log(layerName);
      const wmsLayer = new maptalks.WMSTileLayer(`wms`, {
        urlTemplate: `${url}/mapservice/gserver/${layerName}/wms`,
        layers: `gserver:${layerName}`,
        timestamp: new Date().getTime(),
        version: '1.0.0',
        format: 'image/png',
        srs: 'EPSG:4326',
        collisionScope: 'map',
        depthMask: false,
      })
      layerVector.value = wmsLayer.addTo(window.viewer)
    } catch (error) {
      console.log(error,"=============================");
    }
  }

  // 移除矢量图层
  function removeVectorLayer() {
    if (layerVector.value) {
      layerVector.value.remove()
      layerVector.value = null
    }
  }


  // 添加影像图层
  function addImageryLayer(layerName) {
    removeImageryLayer()
    try {
      const params = {
        urlTemplate: `${url}/maptilecache/service/wms`,
        layers: `${layerName}`,
        version: '1.0.0',
        timestamp: new Date().getTime(),
        format: 'image/png',
        srs: 'EPSG:4326',
      }
      const wmsLayerImg = new maptalks.WMSTileLayer('wmsImg', params)
      layerImg.value = wmsLayerImg.addTo(window.viewer)
      return wmsLayerImg
    }catch (error) {
      console.log(error,"=============================");
    }
  }

  function removeImageryLayer(){
    if (!layerImg.value) return
    layerImg.value.remove()
    layerImg.value = null
  }
  return {
    addVectorLayer,
    addImageryLayer,
    removeImageryLayer
  }
}
