var advent = new Vue({
    el: '#advento',
    data: {
        output: "",
        test: "",
        input: "",
        func: 6,
        version: 1,
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    },
    methods: {
        runFunction: function (func) {
            switch (func) {
                case 1: this.day1(this.input, this.version);
                    break;
                case 2: this.day2(this.input, this.version);
                    break;
                case 3: this.day3(this.input, this.version);
                    break;
                case 4: this.day4(this.input, this.version);
                    break;
                case 5: this.day5(this.input, this.version);
                    break;
                case 6: this.day6(this.input, this.version);
                    break;
                default: this.output = "Ainda não implementado..";
                    break;
            }
        },
        day1: function (input, version) {
            var lg = input.length;

            var b = (version == 2) ? lg / 2 : 1;

            var res = 0;

            for (var a = 0; a < lg; a++) {
                if (input[a] == input[b % lg]) {
                    res += parseInt(input[a]);
                }
                b++;
            }

            this.output = res;
        },
        day2: function (input, version) {
            lines = input.split("\n");
            var res = 0;

            for (i = 0; i < lines.length; i++) {
                line = lines[i]
                    .split(/[ \t]+/)
                    .map(a => parseInt(a))
                    .sort((a, b) => b - a);

                if (version == 1) {
                    res += line[0] - line[line.length - 1];
                }
                else {
                    exit = false;

                    for (j = 0; j < line.length && !exit; j++) {
                        for (k = j + 1; k < line.length && !exit; k++) {

                            if ((line[j] % line[k]) == 0) {
                                res += line[j] / line[k];
                                console.log(res);
                                exit = true;
                            }
                        }
                    }
                }
            }

            this.output = res;
        },
        day3: function (input, version) {
            if (version == 2) {
                this.day3v2(input);
            }
            else {
                var squareLen = 1;
                input = parseInt(input);

                while (input > Math.pow(squareLen, 2)) {
                    squareLen += 2;
                }
                distToCorner = (Math.pow(squareLen, 2) - input) % (squareLen - 1);

                if (distToCorner > (squareLen / 2)) {
                    distToCorner = (squareLen - 1) - distToCorner;
                }
                var steps = (squareLen - 1) - Math.abs(distToCorner);

                this.output = steps;
            }
        },
        day3v2(input) {
            var walk = function (dir, x, y) {
                switch (dir) {
                    case 0: return [x + 1, y];
                    case 1: return [x, y + 1];
                    case 2: return [x - 1, y];
                    case 3: return [x, y - 1];
                }
            }
            var sumNeigh = function (matrix, x, y) {
                var ret = 0;

                for (i = x - 1; i <= x + 1; i++) {
                    for (j = y - 1; j <= y + 1; j++) {
                        ret += matrix[i][j];
                    }
                }

                return (ret - matrix[x][y]);
            }

            var matrix = new Array(11).fill(0).map(x => new Array(11).fill(0));

            matrix[5][5] = 1;

            var x = 5;
            var y = 5;

            var dir = 0;
            var steps = 1;
            var stepsToTurn = 1;

            while (matrix[x][y] < input) {

                if (stepsToTurn == 0) {
                    dir = (dir + 1) % 4;

                    if (dir % 2 == 0) {
                        steps++;
                    }

                    stepsToTurn = steps;
                }

                stepsToTurn--;
                var walked = walk(dir, x, y);
                x = walked[0];
                y = walked[1];


                matrix[x][y] = sumNeigh(matrix, x, y);
            }
            this.output = matrix[x][y];
            console.log(matrix);
        },
        day4: function (input, version) {
            lines = input.split("\n");
            var res = 0;

            for (i = 0; i < lines.length; i++) {
                line = lines[i].split(/[ \t]+/);

                if (version == 2) {
                    line = line.map(a => ((Array.from(a)).sort((x, y) => x.localeCompare(y))).join(''));
                }

                lineNoDuplicates = Array.from(new Set(line));

                if (line.length == lineNoDuplicates.length) {
                    res++;
                }
            }
            this.output = res;
        },
        day5: function (input, version) {
            input = input.split("\n").map(a => parseInt(a));

            var res = 0;
            var pos = 0;

            while (pos < input.length) {
                var temp = pos;
                pos += input[pos];

                (version == 2 && (input[temp]) >= 3) ? input[temp]-- : input[temp]++;

                res++;
            }
            this.output = res;
        },
        day6: function (input, version) {
            var highest = function(list){
                temp = list.sort((a,b)=> b-a);

                return temp[0];
            }

            input = input.split(/[ \t]+/).map(a=>parseInt(a));
            var results= [];
            var res=0;

            while(results.indexOf(input)==(-1) && res<9999) {
                results.push(input.slice(0).join());
                
                var high = highest(input.slice(0));
                var pos=input.indexOf(high);
                
                input[pos]=0;

                for(var i=1;i<=high;i++){
                    input[(pos+i)%(input.length)]++;
                }
                res++;
            }
            (version==1) ? this.output = res : this.output = (results.length-results.indexOf(input.slice(0).join()) -1);
        },
    }
})

