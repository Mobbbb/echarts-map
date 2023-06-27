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
            zoom: 5,
            aspectScale: 0.75,
            center: [111.428599, 35.661378],
            show: true,
            map: map,
            roam: true,
            label: {
                normal: {
                    show: true,
                    color: '#1b81f1',
                    fontSize: 8,
                },
            },
            regions: regions
        },
        series: [
            {
                type: "scatter",
                coordinateSystem: "geo",
                data: [
                        [-63.05, 18.22, 'Anguilla'],
                        [-64.65, 18.4, 'The British Virgin Islands'],
                        [171.2, 7.1, 'Marshall'],

                        [
                            116.5,
                            40.3,
                            "北京市"
                        ],
                        [
                            117.29,
                            39.12,
                            "天津市"
                        ],
                        [
                            115.502461,
                            38.045474,
                            "河北省"
                        ],
                        [
                            112.549248,
                            37.857014,
                            "山西省"
                        ],
                        [
                            112.670801,
                            41.818311,
                            "内蒙古自治区"
                        ],
                        [
                            123.429096,
                            41.296767,
                            "辽宁省"
                        ],
                        [
                            125.8245,
                            43.886841,
                            "吉林省"
                        ],
                        [
                            127.942464,
                            47.956967,
                            "黑龙江省"
                        ],
                        [
                            121.472644,
                            31.231706,
                            "上海市"
                        ],
                        [
                            119.667413,
                            33.141544,
                            "江苏省"
                        ],
                        [
                            120.153576, 
                            29.287459,
                            "浙江省"
                        ],
                        [
                            117.283042,
                            31.86119,
                            "安徽省"
                        ],
                        [
                            118.206239,
                            26.275302,
                            "福建省"
                        ],
                        [
                            115.892151,
                            27.676493,
                            "江西省"
                        ],
                        [
                            118.500923,
                            36.475807,
                            "山东省"
                        ],
                        [
                            113.665412,
                            34.257975,
                            "河南省"
                        ],
                        [
                            112.798572,
                            30.584355,
                            "湖北省"
                        ],
                        [
                            112.082279,
                            27.79409,
                            "湖南省"
                        ],
                        [
                            113.280637,
                            23.125178,
                            "广东省"
                        ],
                        [
                            108.820004,
                            23.92402,
                            "广西壮族自治区"
                        ],
                        [
                            109.83119,
                            19.031971,
                            "海南省"
                        ],
                        [
                            107.904962,
                            30.233155,
                            "重庆市"
                        ],
                        [
                            104.065735,
                            30.659462,
                            "四川省"
                        ],
                        [
                            106.713478,
                            26.978343,
                            "贵州省"
                        ],
                        [
                            101.612251,
                            25.040609,
                            "云南省"
                        ],
                        [
                            88.132212,
                            31.660361,
                            "西藏自治区"
                        ],
                        [
                            109.348024,
                            35.363161,
                            "陕西省"
                        ],
                        [
                            103.823557,
                            36.058039,
                            "甘肃省"
                        ],
                        [
                            95.978916,
                            36.023178,
                            "青海省"
                        ],
                        [
                            106.278179,
                            37.46637,
                            "宁夏回族自治区"
                        ],
                        [
                            85.617733,
                            41.292818,
                            "新疆维吾尔自治区"
                        ],
                        [
                            121.009062,
                            24.044332,
                            "台湾省"
                        ],
                        [
                            114.173355,
                            22.420048,
                            "香港特别行政区"
                        ],
                        [
                            113.56909,
                            22.149951,
                            "澳门特别行政区"
                        ]
                    
                ],
                emphasis: {
                    scale: false,
                },
                symbolSize: 50,
                symbol: 'image://./images/2.png',
                symbolOffset: [0, -25],
            }
        ]
    }
}

function renderMapCharts(domId, option) {
    var dom = document.getElementById(domId)
    var mapCharts = echarts.init(dom)
    mapCharts.setOption(option)
}
