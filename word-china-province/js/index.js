var diygGeojson = testJson, // 自定义各市边界geo数据集合，初始化为浙江的所有市
    data = [], // 展示数据
    regions = [] // 最顶层的展示图层

diygGeojson.features = diygGeojson.features.concat(chinaData.features)

echarts.registerMap('ZJ-MAP', diygGeojson)

// 渲染五个图层的地图
renderMapCharts('container', getOption('ZJ-MAP', regions, data))
