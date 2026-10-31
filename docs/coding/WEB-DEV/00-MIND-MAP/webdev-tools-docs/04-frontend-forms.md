# 04 — Forms + Validation: React Hook Form, Zod, Yup and the Rest

> Umbrella: Frontend → Form Handling + Validation
> Purpose: Taking user input, validating it, showing errors
> Note: Zod is used on both frontend and backend

---

## What This Category Solves

In forms you have to handle:
- Tracking input values
- Validation (is the email format correct? is the password 8 chars?)
- Showing error messages
- Submit handling
- Loading states

Doing it from scratch is lots of code — these tools simplify it.

---

## Two Separate Things — Form Library + Validator

```
FORM LIBRARY:    Manage form state, handle submit
  → React Hook Form, Formik

VALIDATOR:       Is the data in the right format? Check it
  → Zod, Yup, Valibot

Used together:
  → React Hook Form + Zod → Most popular combo 2024
```

---

## Form Libraries

---

### React Hook Form
**Tag: 🟢 Most Popular 2024 | Recommended | Performance**

```
What it is: Hooks-based form library — minimal re-renders, great performance
When to use:
  → Almost always — default choice in new projects

Real app example:
  → Swiggy's address form: Name, phone, house no, landmark — all validated
  → Razorpay onboarding: Business details form (many fields)
  → ShopKaro signup/login forms

Pros:
  → Uncontrolled inputs — minimal re-renders (fast)
  → Perfect integration with Zod
  → Excellent TypeScript support

Code feel:
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)  // Zod validation
  })

  <input {...register("email")} />
  {errors.email && <span>{errors.email.message}</span>}

Difference from Formik:
  → React Hook Form: Uncontrolled (refs) → Fast
  → Formik: Controlled (state) → More re-renders → Slower

In India: Became standard in new projects
```

---

### Formik
**Tag: 🟡 Legacy | Was standard 2019-2022**

```
What it is: Form state management with controlled inputs
When to use:
  → Existing Formik codebase
  → Avoid in new projects — React Hook Form is better

Difference from React Hook Form:
  → Controlled inputs → Re-render on every keystroke
  → Slower than React Hook Form
  → More boilerplate

Status: Still maintained — but React Hook Form took the popularity
```

---

## Validators

---

### Zod
**Tag: 🟢 Most Popular 2024 | TypeScript-first | Frontend + Backend**

```
What it is: TypeScript-first schema validation — used on both frontend and backend
When to use:
  → TypeScript project
  → Form validation
  → Validating API request/response (backend too)
  → Validating environment variables

IMPORTANT: Zod isn't only frontend — backend too:
  → Request body in an API route → validate with Zod
  → Data from database → parse with Zod
  → .env variables → validate with Zod (popular pattern)

Real app example:
  → Swiggy: Address form — pincode 6 digits? phone 10 digits?
  → ShopKaro signup: Email format? Password min 8 chars?
  → Backend: Validate POST /api/orders body

Code feel:
  const signupSchema = z.object({
    email: z.string().email("Enter valid email"),
    password: z.string().min(8, "Minimum 8 characters"),
    name: z.string().min(2, "Name too short")
  })

  // TypeScript type automatically available:
  type SignupData = z.infer<typeof signupSchema>

  // Same schema on backend:
  const body = signupSchema.parse(await req.json())
  // If invalid → automatically throws error

Pros:
  → TypeScript types generate automatically from schema
  → Frontend and backend can share the same schema
  → Excellent error messages
  → Composable — schemas can be combined

In India: Rapidly adopted after 2022
With tRPC: Perfect pair — end-to-end type safety
```

---

### Yup
**Tag: 🟡 Older | Was standard before Zod | Still used**

```
What it is: Schema-based validation — JavaScript-first (TypeScript support secondary)
When to use:
  → Existing Yup codebase
  → With Formik (Formik + Yup classic combo)
  → JavaScript project (no TypeScript)

Difference from Zod:
  → Yup: JavaScript-first, promise-based async
  → Zod: TypeScript-first, sync by default
  → Better TypeScript integration in Zod

Status: Still maintained, still popular — but Zod took the lead

Code feel:
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  })
```

---

### Valibot
**Tag: 🔵 Lightweight | Tiny bundle | Growing**

```
What it is: Validation like Zod — but much smaller bundle size
When to use:
  → Bundle size critical (edge functions, serverless)
  → Zod feels too big

Difference from Zod:
  → Valibot: ~8KB | Zod: ~50KB
  → Slightly different API
  → Smaller ecosystem for now

Status: Growing — but Zod's ecosystem more mature
```

---

### Joi
**Tag: 🟡 Backend-first | Node.js classic**

```
What it is: Schema validation — originally for Node.js/Express
When to use:
  → Express.js backend with existing Joi
  → Avoid in browser — Zod is better

Express classic pattern:
  → Joi + Express → Request validation
  → Now: Zod + Hono/Fastify → Better TypeScript

Status: Found in older Express projects
```

---

## Best Combos

```
2024 Standard:
  React Hook Form + Zod + shadcn/ui inputs
  → Most common combo in production

Legacy (still working):
  Formik + Yup
  → Older projects

Backend validation:
  Zod (same library, can share schemas with frontend)
```

---

## ShopKaro Example — Login Form

```tsx
// Zod schema — can share between frontend + backend
const loginSchema = z.object({
  email: z.string().email("Enter valid email"),
  password: z.string().min(1, "Enter password")
})

// React Hook Form + Zod
function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register("password")} type="password" />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Login</button>
    </form>
  )
}

// Same schema on backend
// /app/api/auth/login/route.js
const body = loginSchema.parse(await req.json())
// If invalid → 400 error automatically
```

---

## Quick Decision

```
Form library:
  → React Hook Form (almost always)
  → Existing Formik? Leave it

Validator:
  → Zod (TypeScript project)
  → Yup (existing codebase or plain JS)
  → Valibot (bundle size critical)

Backend validation:
  → Zod (same as frontend — share schemas)
```

---

## Next Doc

`05-frontend-http.md` — HTTP Clients — fetch, Axios, React Query, SWR — how API calls are made, how Zomato's product listing would be fetched.
