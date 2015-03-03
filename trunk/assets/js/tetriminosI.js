function TetriminosI(ctx, direction, canvas) {
    "use strict";

    var self = this;
    this.squares = [];
    var square0 = new Square(0, 6);
    var square1 = new Square(0, 7);
    var square2 = new Square(0, 8);
    var square3 = new Square(0, 9);
    var test = false;
    self.squares.push(square0);
    self.squares.push(square1);
    self.squares.push(square2);
    self.squares.push(square3);
    this.stop = false;
    this.verticale = true;
    this.drawSquare = function () {
        for (var k = 0; k < self.squares.length; k++) {
            ctx.fillStyle = "orange";
            if (self.squares[k].i <= 19) {
                ctx.lineWidth = 1.5;
                ctx.fillRect((self.squares[k].j * 25), self.squares[k].i * 25, 25, 25);
                ctx.strokeRect((self.squares[k].j * 25) + 2, self.squares[k].i * 25 + 2, 22, 22);
                test = true;
            } else {
                test = false;
            }

        }
    };

    this.animateSquare = function (dir, grid) {
        var oldSquares = [];

        if (self.squares[3].i < 19 && !self.checkCollisionNormal(grid)) {
            for (var k = 0; k < self.squares.length; k++) {
                grid[self.squares[k].i][self.squares[k].j] = false;
            }
            oldSquares.push(self.squares[0]);
            oldSquares.push(self.squares[1]);
            oldSquares.push(self.squares[2]);
            oldSquares.push(self.squares[3]);


            for (var k = 0; k < self.squares.length; k++) {
                if (test) {
                    ctx.clearRect((self.squares[k].j * 25), self.squares[k].i * 25, 25, 25);
                    self.squares[k].i++;
                }
            }
            // On déplace la brique

            if (dir == direction.LEFT && self.squares[2].j > 0 && !self.checkCollisionLeft(grid)) {
                for (var k = 0; k < self.squares.length; k++) {
                    self.squares[k].j--;
                }
            } else if (dir == direction.RIGHT && self.squares[3].j < 13 && !self.checkCollisionRight(grid)) {
                for (var k = 0; k < self.squares.length; k++) {
                    self.squares[k].j++;
                }
            } else if (dir == direction.UP) {
                if (self.verticale) {
                    self.squares[1].i++;
                    self.squares[1].j--;
                    self.squares[2].i += 2;
                    self.squares[2].j -= 2;
                    self.squares[3].i += 3;
                    self.squares[3].j -= 3;
                    self.verticale = false;
                } else {
                    self.squares[1].i--;
                    self.squares[1].j++;
                    self.squares[2].i -= 2;
                    self.squares[2].j += 2;
                    self.squares[3].i -= 3;
                    self.squares[3].j += 3;
                }
            }
            // S'il n'y a aucune collision on rafraichit  la vue
            for (var k = 0; k < self.squares.length; k++) {
                grid[oldSquares[k].i][oldSquares[k].j] = false;
                grid[self.squares[k].i][self.squares[k].j] = true;
            }
            self.drawSquare();
        } else {
            for (var i = 0; i < oldSquares.length; i++) {
                self.squares[i] = oldSquares[i];
            }
            self.stop = true;

        }
    };

    this.checkCollisionNormal = function (grid) {
        var collision = false;
        if (grid[self.squares[0].i + 1][self.squares[0].j] == true ||
            grid[self.squares[1].i + 1][self.squares[1].j] == true ||
            grid[self.squares[2].i + 1][self.squares[2].j] == true ||
            grid[self.squares[3].i + 1][self.squares[3].j] == true) {
            collision = true;
        }

        return collision;
    };
    this.checkCollisionLeft = function (grid) {
        var collision = false;
        if (grid[self.squares[0].i][self.squares[0].j - 1] == true ||
            grid[self.squares[1].i][self.squares[1].j - 1] == true ||
            grid[self.squares[2].i][self.squares[2].j - 1] == true ||
            grid[self.squares[3].i][self.squares[3].j - 1] == true) {
            collision = true;
        }
        return collision;
    };
    this.checkCollisionRight = function (grid) {

        var collision = false;
        if (grid[self.squares[0].i][self.squares[0].j + 1] == true ||
            grid[self.squares[1].i][self.squares[1].j + 1] == true ||
            grid[self.squares[2].i][self.squares[2].j + 1] == true ||
            grid[self.squares[3].i][self.squares[3].j + 1] == true) {
            collision = true;
        }
        return collision;
    };

    this.isOver = function (grid) {
        var isOver = false;
        for (var k = 0; k < grid[4].length; k++) {
            if (grid[4][k] == true) {
                isOver = true;
            }
        }
        return isOver;
    };
}