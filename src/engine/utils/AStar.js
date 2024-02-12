class AStar {
  constructor() {
    this.__tmin = this.__rmax = this.__bmax = this.__lmin = -1;
    this.__initialize();
  }
  static Point(p, x, y) {
    this.P = p;
    this.X = x;
    this.Y = y;
    this.G = this.H = this.F = this.I = 0;
  }
  __euclidean(a, b) {
    return Math.round(
      10 * Math.sqrt(Math.pow(a.X - b.X, 2) + Math.pow(a.Y - b.Y, 2))
    );
  }
  __initialize() {
    this.__open = [];
    this.__close = [];
    this.__maps = {};
  }
  __makeID(x, y, limit) {
    return x + y * limit;
  }
  __getMinNode() {
    let o = this.__open,
      l = o.length,
      min = 0,
      max = o[0].F,
      t = null;

    for (let i = 1; i < l; i++) {
      t = o[i];
      if (t.F < max) {
        max = t.F;
        min = i;
      }
    }
    t = o[min];
    o[min] = o[l - 1];
    o.pop();

    return t;
  }
  __getNodes(node) {
    let map = this.__Map,
      tmin = this.__tmin,
      rmax = this.__rmax,
      bmax = this.__bmax,
      lmin = this.__lmin,
      nodes = [],
      x = node.X,
      y = node.Y,
      t = y - 1,
      r = x + 1,
      b = y + 1,
      l = x - 1,
      __t = t > tmin && map[t][x] === 0,
      __r = r < rmax && map[y][r] === 0,
      __b = b < bmax && map[b][x] === 0,
      __l = l > lmin && map[y][l] === 0,
      i = 0;

    if (__t) {
      nodes[i++] = [x, t];
      if (__l && map[t][l] === 0) {
        nodes[i++] = [l, t];
      }
      if (__r && map[t][r] === 0) {
        nodes[i++] = [r, t];
      }
    }

    if (__l) {
      nodes[i++] = [l, y];
    }

    if (__b) {
      nodes[i++] = [x, b];
      if (__l && map[b][l] === 0) {
        nodes[i++] = [l, b];
      }
      if (__r && map[b][r] === 0) {
        nodes[i++] = [r, b];
      }
    }

    if (__r) {
      nodes[i++] = [r, y];
    }

    return nodes;
  }
  __getAllPath(node) {
    let path = [];
    do {
      path[path.length] = [node.X, node.Y];
    } while ((node = node.P));
    path.reverse();
    his.__initialize();

    return path;
  }
  loadMap(map) {
    this.__Map = map;
    this.__limit = (this.__bmax = map.length) * (this.__rmax = map[0].length);
  }
  search(start, end) {
    const Point = AStar.Point;
    let open = this.__open,
      close = this.__close,
      makeID = this.__makeID,
      maps = this.__maps,
      limit = this.__limit,
      euclidean = this.__euclidean,
      GID = makeID(end.X, end.Y, limit),
      nodes = [],
      length = 0,
      node = null,
      tempnode = null,
      tempg = 0,
      id = 0,
      i = 0,
      j = 0,
      __i = 0,
      __j = 0;

    open.push(new Point(null, start.X, start.Y));

    while ((length = open.length)) {
      node = this.__getMinNode();

      if (node.I !== GID) {
        nodes = this.__getNodes(node);

        for (i = 0, j = nodes.length; i < j; i++) {
          id = makeID(nodes[i][0], nodes[i][1], limit);

          if (!(tempnode = maps[id])) {
            tempnode =
              open[open.length] =
              maps[id] =
                new Point(node, nodes[i][0], nodes[i][1]);
            tempnode.F =
              (tempnode.G = node.G + euclidean(tempnode, node)) +
              (tempnode.H = euclidean(tempnode, end));
            tempnode.I = id;
          } else {
            tempg = node.G + euclidean(tempnode, node);
            if (tempg < tempnode.G) {
              (tempnode.P = node),
                (tempnode.G = tempg),
                (tempnode.F = tempg + tempnode.H);
            }
          }
        }
        close[close.length] = node;
      } else {
        return this.__getAllPath(node);
      }
    }
    return this.__initialize(), [];
  }
}

export default AStar;
