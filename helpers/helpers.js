/* Useful helper functions. */

module.exports = {
  getRandomFromArray: (arr, n) => {
    n = n || 1;
    let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len) {
      throw new RangeError("getRandom: more elements taken than available");
    }

    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  },
  getRandomInt: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getRandomRange: (min, max, fixed) => {
    return (Math.random() * (max - min) + min).toFixed(fixed) * 1;
  },
  numberWithCommas: (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  isCommandline: (userAgent) => {
    check = false;
    if (userAgent) {
      try {
        check = userAgent.search(/curl|wget/i) !== -1;
      } catch (err) {
        /* noop */
      }
    }
    return check;
  },
  getStream: (req, res) => {
    const { Readable } = require("stream");
    const stream = new Readable();

    stream.pipe(res);
    stream._read = () => {};
    req.on("close", () => {
      stream.destroy();
    });
    req.on("error", () => {
      stream.destroy();
    });
    return stream;
  },
  symbols: {
    PAGE_BREAK: "\033[2J\033[H",
  },
  getClientIp: (req) => {
    var ipAddress;
    var forwardedIpsStr = req.header("x-forwarded-for");
    if (forwardedIpsStr) {
      var forwardedIps = forwardedIpsStr.split(",");
      ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
      ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
  },
};
