let HEAT_MAP_COLOR = {
    '0-20000': {
        color: '#fdd39d',
        size: 5,
    },
    '20000-40000': {
        color: '#fdc690',
        size: 10,
    },
    '40000-60000': {
        color: '#fdb27b',
        size: 15,
    },
    '60000-80000': {
        color: '#fc9863',
        size: 20,
    },
    '80000-100000': {
        color: '#f77d52',
        size: 25,
    },
    '100000-120000': {
        color: '#ef6548',
        size: 30,
    },
    '120000-Infinity': {
        color: '#e44d35',
        size: 35,
    },
}

let getOpt = (config) => {
    const { nameMap, data } = config
    return {
        tooltip: {
            trigger: 'item',
            borderWidth: 0,
        },
        geo: {
            tooltip: {
                show: true,
                formatter: function(params) {
                    if (params.value) {
                        return params.value[3]
                    } else if (params.name) {
                        return params.name
                    }
                    return ''
                }
            },
            label: {
                show: false,
                color: '#1b81f1',
            },
            aspectScale: 0.75,
            center: [30, 15],
            map: 'world',
            // 是否开启鼠标缩放和平移漫游 默认不开启 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move' 设置成 true 为都开启
            roam: true,
            // 地图区域的多边形 图形样式
            itemStyle: {
                areaColor: '#2b4cba', // 地图区域的颜色 如果设置了visualMap，areaColor属性将不起作用
                borderWidth: 1,
                borderColor: '#4b6db5',
            },
            // 高亮状态下的多边形和标签样式
            emphasis: {
                label: {
                    show: true,
                    color: '#1b81f1',
                },
                itemStyle: {
                    areaColor: '#FF6347' // 地图区域的颜色
                },
            },
            // 自定义地区的名称映射
            nameMap: nameMap,
        },
        series: [
            {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                itemStyle: {
                    color: function(parmas) {
                        let data = parmas.data, color = 'white'
                        Object.keys(HEAT_MAP_COLOR).map(key => {
                            let rangeArr = key.split('-')
                            if (data[2] >= rangeArr[0] && data[2] < rangeArr[1]) {
                                color = HEAT_MAP_COLOR[key].color
                            }
                        })
                        return color // symbol color
                    }
                },
                symbolSize: function(params) {
                    let size = 5
                    Object.keys(HEAT_MAP_COLOR).map(key => {
                        let rangeArr = key.split('-')
                        if (params[2] >= rangeArr[0] && params[2] < rangeArr[1]) {
                            size = HEAT_MAP_COLOR[key].size
                        }
                    })
                    return size
                },
                data: data
            }
        ]
    }
}