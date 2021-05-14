const markdown = `
Let’s kick off with a simple algorithm, calculating the nth member of the Fibonacci sequence.

\`\`\`ts
class MathExtensions {
	fib(n: number): number { 
    if (n === 0 || n === 1) {
      return 1;
    }
    return this.fib(n - 1) + this.fib(n - 2);
  }
}

const me = new MathExtensions();
console.log(me.fib(10));
\`\`\`

This simple module above calculates the 10th member of the Fibonacci sequence for us. Most of you by this time know that the above algorithm doesn’t deal well with high values of n, so for this we usually use a technique called memoization to store the previous values of the sequence to avoid a stack overflow.

\`\`\`ts
class MathExtensions {
  memo: { [k: string]: number } = {};
  fib(n: number): number { 
    if (n === 0 || n === 1) {
      return 1;
    }
    if (!this.memo.hasOwnProperty(n)) {
      this.memo[n] = this.fib(n - 1) + this.fib(n - 2);
    }
    return this.memo[n];
  }
}
\`\`\`

\`target\` - The name of the class this decorator was used in. In our example, it will be \`MathExtensions\`.
\`propertyKey\` - The name of the property of the class the decorator was applied to. In our case, this can be \`fib\`.

## My first TypeScript decorator
Alright, let’s start with the basics. In this section we will create a decorator that logs something when a function was called.

Looks simple, but already can be super powerful. Maybe you’d like to measure the usage of some methods on a module that you’ve created, the above decorator will give you a reusable way to do so. Feel free to modify the decorator any way you want. As an exercise, you can implement a timestamp to prefix the logs.

Now that we have written our first decorator of this journey, let’s take a look at the problem that we were trying to solve originally. Creating a reusable memoization system.

## The \`memo\` decorator
The \`memo\` decorator is slightly different from what we have seen above, because we would like to change the behaviour of our methods that we are applying them to. This is where the \`PropertyDescriptor\` comes into play, particularly the \`value\` parameter. Since for methods, the \`value\` parameter contains the entire method that we are applying the decorator to, we can take it and modify it to add some extra functionality. Here’s the code:

\`\`\`ts
function memo() {
  const cache: { [k: string]: any } = {};
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const cacheKey = \`__cacheKey__\${args.toString()}\`;
      if (!cache.hasOwnProperty(cacheKey)) {
        cache[cacheKey] = originalMethod.apply(this, args);
      }
      return cache[cacheKey];
    }
  }
}
\`\`\`

As you can see above, we were able to use multiple decorators on the same function. And now we have a very clean Fibonacci solution that doesn’t crash for large values of n. Feel free to copy the code above to the TypeScript Playground and try your fingers on it!

Thanks for sticking with me for this short lesson on decorators. Hope you’ve learned something new, looking forward to our next session!
`;

import * as fs from 'fs';

const re = /^\`\`\`(ts)\n(.*?)\n\`\`\`\n$/gims;
let counter = 0;
for (let match = re.exec(markdown); match; match = re.exec(markdown)) {
    fs.writeFileSync(
        `/Users/prezi/workspace/out/${counter}.${match[1]}`,
        match[2]
    );
    console.log(`created ${counter}.${match[1]}`);
    counter++;
}

