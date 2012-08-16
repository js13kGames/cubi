(function() {
  Game = function(canvasSelector, options) {
    this.options = options || {}
    this.options.rows = this.options.rows || 10
    this.options.cols = this.options.cols || 10

    this.canvas = document.querySelectorAll(canvasSelector)[0]
    this.grid   = new Grid(this.options.rows, this.options.cols, this.canvas)
    this.player = new Player(canvasSelector)
  }

  Game.prototype.render = function(options) {
    this.grid.render()
    this.player.render()

    initTowerPanel.call(this)
    spawnMonsters.call(this)

    return this
  }

  // private

  var initTowerPanel = function() {
    this.grid.cells.forEach(function(cellGroup) {
      cellGroup.filter(function(cell) {
        return cell.type !== GridCell.PATH
      }).forEach(function(cell) {
        cell.on('click', function() {
          new Tower(Tower.TYPES.LASER, cell).render()
        })
      })
    })
  }

  var spawnMonsters = function() {
    var monsters = []
      , speed    = Math.min(250, ~~(Math.random() * 2000))

    for(var i = 0; i < 10; i++) {
      var monster = new Monster(this.grid.path, {
        speed: speed
      })

      monster.on('goal:reached', this.player.hurt.bind(this.player))

      monsters.push(monster)
    }

    monsters.forEach(function(monster, i) {
      setTimeout(function() {
        monster.initMoving()
      }, i * 2 * speed)
    })
  }
})()