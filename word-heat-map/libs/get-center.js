/**
 * @description 取国家最复杂封闭图形，以最东南点与最西南点的中心点作为国家中心坐标
 */
let coordinates, obj = {} // 国家中心点
worldJson.features.forEach(item => {
    if (item.properties.name) {
        let longest = []
        coordinates = item.geometry.coordinates // 封闭区域数组
        if (coordinates.length > 1) { // 多封闭区域
            if (coordinates[0].length === 1) {
                coordinates.forEach(cell => {
                    if (cell.length && cell[0].length > longest.length) {
                        longest = cell[0]
                    }
                })
            } else {
                coordinates.forEach(cell => {
                    if (cell.length > longest.length) {
                        longest = cell
                    }
                })
            }
        } else { // 单封闭区域
            longest = coordinates[0]
        }
        
        let maxPointer = {
            value: longest[0][0] + longest[0][1],
            index: 0,
        }, minPointer = {
            value: longest[0][0] + longest[0][1],
            index: 0,
        }
        longest.forEach((cell, index) => {
            if (cell[0] + cell[1] > maxPointer.value) {
                maxPointer.value = cell[0] + cell[1]
                maxPointer.index = index
            }
            if (cell[0] + cell[1] < minPointer.value) {
                minPointer.value = cell[0] + cell[1]
                minPointer.index = index
            }
        })
        
        obj[item.properties.name] = {
            x: (longest[maxPointer.index][0] + longest[minPointer.index][0]) / 2,
            y: (longest[maxPointer.index][1] + longest[minPointer.index][1]) / 2,
        }
    }
})
