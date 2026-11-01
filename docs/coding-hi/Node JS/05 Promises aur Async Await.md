04 mein humne dekha ki Node async kaam ko background mein bhejta hai aur **callback** se result deta hai. Par ek problem hai — jab bahut saare async kaam ek ke baad ek karne hote hain, toh kya hota hai?

## Callback Hell — Pyramids of Doom

Socho real scenario — **online order flow**:

1. User order place kare
2. Order database mein save karo
3. Payment process karo
4. Confirmation email bhejo

Har step async hai aur agle step ko uske result ki zaroorat hai. Callbacks se aisa dikhega:

```javascript
saveOrder(order, (orderErr, savedOrder) => {
  if (orderErr) {
    console.error(orderErr);
    return;
  }
  processPayment(savedOrder, (payErr, payment) => {
    if (payErr) {
      console.error(payErr);
      return;
    }
    sendEmail(payment, (emailErr, result) => {
      if (emailErr) {
        console.error(emailErr);
        return;
      }
      console.log("Order complete:", result);
    });
  });
});
```

Dekh rahe ho kya hua? **Nested callbacks ka pyramid.** Har async step ek level andar. 5-6 steps ho toh code padhna impossible. Isi ko bolte hain **Callback Hell**.

Problem siraf "ugly code" nahi — **error handling repeat**, nesting deep, aur jab har function `if (err)` likhna pade toh bugs. JavaScript community ne isi se takkar kha kar **Promises** banaye.

## Promise — Ek "Eventually Complete Hoga" Ka Object

**Promise** ek object hai jo represent karta hai ki koi async operation **eventually** complete hoga — ya to success (resolve) ke saath, ya failure (reject) ke saath.

Socho online order ka status — "Order placed. Processing..." — kuch na kuch hoga abhi, par abhi pending hai. Promise bhi wahi hai — ek **pending** state se shuru hota hai, phir **fulfilled** (resolve) ya **rejected** (reject) hota hai.

## Promise Banana — `new Promise`

```javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    // async kaam (example: timer)
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("Data mil gaya");     // success → resolve
      } else {
        reject("Error aa gaya");      // failure → reject
      }
    }, 1000);
  });
};
```

- `new Promise((resolve, reject) => {...})` — ek executor function milta hai
- `resolve(value)` — success hone pe value ke saath call karo
- `reject(error)` — failure pe error ke saath call karo

## Promise Use Karna — `.then` / `.catch`

```javascript
fetchData()
  .then((result) => console.log(result))   // resolve pe chalega
  .catch((error) => console.error(error)); // reject pe chalega
```

**Chaining — Callback Hell Ka Solution:**

Promises se sequential async kaam chain ki tarah likhte hain — **flat, nested nahi:**

```javascript
saveOrder(order)
  .then((savedOrder) => processPayment(savedOrder))
  .then((payment) => sendEmail(payment))
  .then((result) => console.log("Order complete:", result))
  .catch((error) => console.error(error));
```

Dekho — har step apne level pe hai, `.then` se chain ban rahi hai, aur **ek hi `.catch` sab errors handle karta hai.** Nested pyramid gayab. Har `.then` ka return value agle `.then` mein jaata hai.

## Async/Await — Promise Ka Cleaner Version

Promises flat toh hai, par `.then` chaining ab bhi "promise-style" hai. JavaScript ne aur clean tarika diya — **`async`/`await`**. Yeh synchronous code jaisa dikhta hai, par asli mein async hi hai.

```javascript
async function getData() {
  try {
    const result = await fetchData();  // yahan wait karega resolve hone tak
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

getData();
```

- `async` function — isko batata hai "andar await use hoga"
- `await` — Promise ke resolve hone tak **wait karta hai** (par thread block nahi hota!)
- `try/catch` — error handle karne ka cleaner tarika

**Same order flow, async/await se:**

```javascript
async function placeOrder(order) {
  try {
    const savedOrder = await saveOrder(order);
    const payment = await processPayment(savedOrder);
    const result = await sendEmail(payment);
    console.log("Order complete:", result);
  } catch (error) {
    console.error(error);
  }
}
```

Padho — **bilkul synchronous code jaisa lag raha hai**, par asli mein async hai. Har `await` us Promise ke settle hone tak line ko rok deta hai, par thread ko block nahi karta.

## Teeno Tarike — Same Kaam, Compare Karo

Ek function banao jo 2 second baad "Order placed" print kare — teeno tarike se:

**1. Callback:**

```javascript
setTimeout(() => {
  console.log("Order placed");
}, 2000);
```

**2. Promise:**

```javascript
const placeOrder = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Order placed");
      resolve();
    }, 2000);
  });
};
placeOrder();
```

**3. Async/Await:**

```javascript
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function placeOrder() {
  await delay(2000);
  console.log("Order placed");
}
placeOrder();
```

**Dekho evolution:** Callback se Promise (chain-able) → async/await (jaisa synchronous, par async). Yehi **"Manual → Better"** ka asli example hai — kaam wahi, likhne ka tarika better hota gaya.

## React/Next.js Mein Yeh Kahan Use Hoga

Jab tum Next.js mein data fetch karte ho:

```javascript
async function getProducts() {
  const res = await fetch('/api/products');
  const data = await res.json();
  return data;
}
```

`await fetch()` — Promise hai, `await` se wait kiya. `res.json()` — ye bhi Promise hai, `await` se parse kiya. **Yeh pattern baar-baar aayega** — data fetching, form submission, mutations. Isliye yahan pakka karna.

## Common Mistakes

- ❌ `async` function ke andar `await` bhoolna — function async hai par await nahi lagaya toh Promise resolve hone ka wait nahi karega, seedha pending Promise mil jayega.
- ❌ `await` ko non-async function mein use karna — error: "await is only valid in async function". Function ko `async` banao.
- ❌ Promise mein `resolve`/`reject` call bhoolna — Promise hamesha pending rahega, `.then` kabhi nahi chalega, app hang feel hogi.
- ❌ `.catch` nahi lagana ya `try/catch` na karna — rejected Promise ka error silently gayab ho jata hai ya unhandled rejection error aata hai.
- ❌ `new Promise` mein sync kaam daalna — agar andar sync hai, Promise ki zaroorat nahi. Promise sirf async wrap karne ke liye.

## In Your Own Words

1. Callback hell kya hai aur kyu hota hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Jab multiple async kaam ek ke baad ek karna ho (order → payment → email), callback ke andar callback likhne se nested pyramid ban jaata hai. Isse code padhna mushkil aur error handling repeat hoti hai. Isi ko callback hell kehte hain.

</details>

2. Promise kya represent karta hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Promise ek object hai jo async operation ke eventual result ko represent karta hai — pending state se shuru, phir resolve (fulfilled) ya reject (rejected). `.then`/`.catch` se handle karte hain.

</details>

3. `.then()` chaining callback hell ko kaise solve karti hai?

<details>
<summary>Sample Jawab</summary>

**Jawab:** Har async step `.then()` se chain hota hai — flat structure, nested nahi. Har `.then` ka return value agle `.then` mein jaata hai, aur ek hi `.catch` saare errors handle karta hai.

</details>

4. `async`/`await` kya karta hai aur `try/catch` kyun?

<details>
<summary>Sample Jawab</summary>

**Jawab:** `async` function ko mark karta hai ki andar `await` use hoga. `await` Promise ke resolve hone tak wait karta hai (thread block nahi). `try/catch` errors ko clean tarike se handle karta hai — Promise ka `.catch` jaisa.

</details>

## What It Is NOT

⚠️ **`await` = thread block nahi karta.** Ye sirf us line ko wait karata hai Promise resolve hone tak, par Event Loop free rehta hai — baaki async kaam chalta rehta hai. Blocking (04 ka `readFileSync`) se yeh alag hai.

⚠️ **Callback = "galat/purana" nahi.** Callbacks ab bhi exist karte hain (Event listeners, setTimeout). Problem sirf **nested callbacks** ki hai (callback hell). Simple callback use karna fine hai.

⚠️ **Promise = async operation ka data nahi.** Promise "abhi future mein aayega" ka **contract/object** hai. Uska data tab milta hai jab `.then`/`await` se resolve value access karo.

⚠️ **async/await = synchronous nahi banata.** Code *dikhta* synchronous jaisa hai, par behave async hi karta hai. Race conditions wahi rehti hain.

---

Ab tumhare paas async ka poora power set hai — callbacks, Promises, async/await. Ab usse kuch asli banate hain — ek **HTTP server**. Jab tak tum server nahi banate, Node ka poora point adhura hai. Manual tarike se raw Node server banayenge — taaki samjho Express/Next.js ke peeche kya hota hai. Agla topic: **HTTP Server**. Chal karte hain.