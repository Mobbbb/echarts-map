/**
 * @description 获取Regions样式配置项
 * @param {String} name 市名
 * @param {Object} itemConfig 单个市的个性化配置项
 * @param {Object} itemStyle 整体风格的配置项
 * @returns {Object} 单个城市的regions配置
 */
 function getRegionsItem(name, itemConfig, itemStyle = {}) {
    return {
        name: name,
        itemStyle: itemStyle,
        emphasis: { // 鼠标滑过高亮的颜色
            itemStyle: {
                areaColor: itemConfig.color,
            },
            label: {
                show: itemConfig.label ? true : false,
                color: '#1b81f1'
            },
        },
        label: {
            show: itemConfig.label && itemStyle.showLabel ? true : false,
            offset: itemConfig.labelPosition || [0, 0]
        },
        tooltip: {
            show: true,
        },
    }
}

/**
 * @description 获取最终渲染的option
 * @param {String} map 指定渲染的数据地图
 * @param {Array.<Object>} regions 地区数据集
 * @param {Array.<Object>} data 展示数据
 * @param {Number} zoom 缩放比例
 * @returns {Object} echarts渲染所需的option
 */
function getOption(map, regions, data = [], zoom = 1) {
    return {
        tooltip: {
            show: false,
        },
        toolbox: {
            show: false,
        },
        geo: {
            show: true,
            map: map,
            label: {
                normal: {
                    show: true,
                    color: '#1b81f1',
                    fontSize: 8,
                },
            },
            zoom: zoom,
            regions: regions
        },
        series: [
            {
                type: "scatter",
                coordinateSystem: "geo",
                data: data,
                emphasis: {
                    scale: false,
                }
            }
        ]
    }
}

function renderMapCharts(domId, option) {
    var dom = document.getElementById(domId)
    var mapCharts = echarts.init(dom)
    mapCharts.setOption(option)
}
