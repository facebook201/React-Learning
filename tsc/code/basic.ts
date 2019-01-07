
let name: string = 'Bob';

// 

interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 }; // 第一次创建的时候修改 之后都不能修改
p1.x = 5; // error!


export {};
