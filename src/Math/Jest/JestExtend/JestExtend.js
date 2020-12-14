function sample(func, n = 1000) {
  let arr = [];
  for (let i = 0; i < n; i++)
    arr.push(func());
  return arr;
}
globalThis.sample = sample;

expect.extend({



  toBeArrayCloseTo(received, arr) {
    let pass = true;
    if (!Array.isArray(received)) pass = false;
    if (!Array.isArray(arr)) pass = false;
    if (received.length !== arr.length) pass = false;
    for (let i = 0; i < arr.length; i++) {
      if (Math.abs(received[i] - arr[i]) > 0.000000001) pass = false;
    }
    if (pass) {
      return {
        message: () => `expected ${received} not to be close to ${arr}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be close to ${arr}`,
        pass: false,
      };
    }
  },








  toBeFlatWithin(received, min, max) {
    const pass = received.flat().every(x => x >= min && x <= max);
    if (pass) {
      return {
        message: () => `expected ${received} not to be within ${min} - ${max}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be within ${min} - ${max}`,
        pass: false,
      };
    }
  },

  toBeFlatAbsWithin(received, min, max) {
    const pass = received.flat().every(x => Abs(x) >= min && Abs(x) <= max);
    if (pass) {
      return {
        message: () => `expected ${received} not to be abs within ${min} - ${max}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be abs within ${min} - ${max}`,
        pass: false,
      };
    }
  },


  toBeFlatIs(received, func) {
    const pass = received.flat().every(x => func(x));
    if (pass) {
      return {
        message: () => `expected ${received} not to be ${func.name}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be ${func.name}`,
        pass: false,
      };
    }
  },



  toBeFlatIsInteger(received, func) {
    const pass = received.flat().every(x => IsInteger(x));
    if (pass) {
      return {
        message: () => `expected ${received} not to be ${func.name}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be ${func.name}`,
        pass: false,
      };
    }
  },


  toBeFlatDistinct(received, count) {
    const pass = [... new Set(received.flat())].length === count;
    if (pass) {
      return {
        message: () => `expected ${received} not to have ${count} distinct items`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to have ${count} distinct items`,
        pass: false,
      };
    }
  },


  toBeFlatDiverse(received) {
    const pass = [... new Set(received.flat())].length > 100;
    if (pass) {
      return {
        message: () => `expected ${received} not to have >100 distinct items`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to have >100 distinct items`,
        pass: false,
      };
    }
  },



  toAllHaveLength(received, length) {
    const pass = received.every(x => x.length === length);
    if (pass) {
      return {
        message: () => `expected ${received} not to all have legnth ${length}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to all have legnth ${length}`,
        pass: false,
      };
    }
  },



  toBeIncluded(received, allowed) {
    const pass = received.flat().every(x => allowed.includes(x));
    if (pass) {
      return {
        message: () => `expected ${received} not to all have legnth ${length}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to all have legnth ${length}`,
        pass: false,
      };
    }
  },


  toBeUnique(received) {
    const pass = received.every(x => x.length === [... new Set(x)].length);
    if (pass) {
      return {
        message: () => `expected ${received} not to all be unique`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to all be unique`,
        pass: false,
      };
    }
  },





});
