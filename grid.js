(function() {
  Grid = function(rows, cols, canvas) {
    this.rows      = rows
    this.cols      = cols
    this.canvas    = canvas
    this.container = document.createElement('table')
  }

  Grid.prototype.render = function() {
    createDOM.call(this)

    var cells = createPath.call(this)

    cells.forEach(function(cell) {
      cell.setType(GridCell.PATH)
    })
  }

  // private

  var createDOM = function() {
    for(var i = 0; i < this.rows; i++) {
      var tr = document.createElement('tr')

      for(var j = 0; j < this.cols; j++) {
        var cell = new GridCell()
        tr.appendChild(cell.getElement())
      }

      this.container.appendChild(tr)
    }

    this.canvas.appendChild(this.container)
  }

  var createPath = function() {
    var accessableCells = []
      , lastWayPoint    = null

    for(var colIndex = 0; colIndex < this.cols; colIndex++) {
      console.log('column: #' + colIndex)

      var rowIndex1 = lastWayPoint || ~~(Math.random() * this.rows)
        , rowIndex2 = ~~(Math.random() * this.rows)


      if(rowIndex1 === rowIndex2) {
        var cell = getCell.call(this, colIndex, rowIndex1)
        accessableCells.push(cell)
      } else {
        var sorted = [rowIndex1, rowIndex2].sort(function(a,b){ return (a<b) ? -1 : 1})
          , start  = sorted[0]
          , end    = sorted[1]

        while(start < end) {
          var cell = getCell.call(this, colIndex, start)
          accessableCells.push(cell)
          start++
        }
      }

      lastWayPoint = rowIndex2
    }

    return accessableCells
  }

  var getCell = function(x, y) {
    var rows = this.container.querySelectorAll('tr')
      , row  = rows[y]

    return row.querySelectorAll('td')[x].cell
  }
})()
