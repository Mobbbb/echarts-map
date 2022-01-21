var diygGeojson = zhejiang, // 自定义各市边界geo数据集合，初始化为浙江的所有市
    data = [], // 展示数据
    regions = [], // 最顶层的展示图层
    borderRegions = [], // 第二层高亮边框图层
    shadowRegions = [], // 第三层模拟阴影的平移图层
    bigRegions = [], // 第四层与背景色同色的放大图层
    bigBorderRegions = [] // 第五层放大图层的边框图层

// 构造和设置地图数据
diygGeojson.features.push(fuzhou.features[0]) // 增加福州市
diygGeojson.features.push(shanghai.features[0]) // 增加上海市
diygGeojson.features.push(nanjing.features[0]) // 增加南京市

echarts.registerMap('ZJ-MAP', zhejiangBK) // 注册浙江边界地图
echarts.registerMap('DIY-MAP', diygGeojson, { // 注册自定义区域的边界地图
    '南京': { // 调整南京经纬度
        left: 116.9,
        top: 30.5,
        width: 0.90
    },
    '福州': { // 调整福州经纬度
        left: 116.8,
        top: 27.1,
        width: 1.3
    },
});

// 根据各个地区的配置，设置regions和data
diygGeojson.features.forEach(function(item) {
    var itemConfig = MAP_CONFIG[item.properties.name] || {}
    // 设置最顶层的展示图层的region数据
    regions.push(getRegionsItem(item.properties.name, itemConfig, {
        showLabel: true,
        areaColor: itemConfig.color,
        borderWidth: 1,
        borderColor: '#4b6db5',
    }))
    // 设置第二层高亮边框图层的region数据
    borderRegions.push(getRegionsItem(item.properties.name, itemConfig, {
        borderColor: '#9accde',
        borderWidth: 3,
        shadowBlur: 5,
        shadowColor: 'rgba(255, 255, 255, 0.5)'
    }))
    // 设置第三层模拟阴影的平移图层的region数据
    shadowRegions.push(getRegionsItem(item.properties.name, itemConfig, {
        areaColor: itemConfig.color,
    }))
    // 设置第四层与背景色同色的放大图层的region数据
    bigRegions.push(getRegionsItem(item.properties.name, itemConfig, {
        areaColor: '#09123e',
        borderColor: '#09123e',
    }))
    // 设置第五层放大图层的边框图层的region数据
    bigBorderRegions.push(getRegionsItem(item.properties.name, itemConfig, {
        borderColor: '#243b75',
        borderWidth: 3,
    }))
    
    var dataItem = {
        name: item.properties.name,
        value: itemConfig.value,
    }
    var symbolConfig = itemConfig.symbolConfig || {}
    if (symbolConfig.url) {
        dataItem.value = [symbolConfig.x, symbolConfig.y, itemConfig.value]
        dataItem.symbol = symbolConfig.url
        dataItem.symbolSize = symbolConfig.size
    }
    data.push(dataItem)
})

// 渲染五个图层的地图
renderMapCharts('container', getOption('DIY-MAP', regions, data))
renderMapCharts('borderContainer', getOption('DIY-MAP', borderRegions))
renderMapCharts('shadowContainer', getOption('DIY-MAP', shadowRegions))
renderMapCharts('bigContainer', getOption('ZJ-MAP', bigRegions, [], 1.25))
renderMapCharts('bigBorderContainer', getOption('ZJ-MAP', bigBorderRegions, [], 1.25))
