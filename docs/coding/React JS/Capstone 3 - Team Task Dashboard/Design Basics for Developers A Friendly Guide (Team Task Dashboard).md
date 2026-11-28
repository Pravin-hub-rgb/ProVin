# Design Basics for Developers: A Friendly Guide (Team Task Dashboard)

Nov 28, 2026 · @Pravin

## Start here

You do not need to be a designer to make an app that looks good. You need to make three decisions once, write them down, and then reuse them everywhere. That is what real teams do, and it is what this guide teaches.

The three decisions:

1. **One main color.** The color of your buttons and links. Everything else is grey, white, or a status color.
2. **One font and a few sizes.** A single clean font, used at four or five sizes.
3. **One spacing step.** Gaps between things come from a fixed set of values, never random numbers.

Tailwind already ships with good choices for all three, so most of your "design work" becomes picking class names. You will not need Figma for this project. When a screen feels off, come back to this guide and check which of the three decisions you broke.

How to read this guide: skim the vocabulary once, then jump to the palette section and copy it into your project. Come back to the other sections when you need them.

## The vocabulary, in plain words

Designers use a lot of jargon, but most of it names things you already notice. Here are the words you will meet most, each with where it shows up in your app.

| Word | What it means | In your app |
| --- | --- | --- |
| **Layout** | Where things sit on the page and how they are grouped. | Four stacked sections on phone, four columns on desktop. |
| **Hierarchy** | What the eye sees first, second, third. Size, weight and color create it. | The page heading is big and bold, a due date is small and grey. |
| **Spacing / padding / margin** | Empty room around and between things. Padding is inside a box, margin is outside it. | The gap between task cards. |
| **Whitespace** | Empty space left on purpose. Crowded screens feel cheap, airy ones feel calm. | Room around the four summary cards. |
| **Typography** | Everything about text: font, size, weight, line height. | Task titles semibold, descriptions regular. |
| **Contrast** | How different the text color is from the background. Low contrast is hard to read. | Grey text on a white card must still be readable. |
| **Palette** | The small set of colors your app uses. | One blue, greys, plus red, amber and green. |
| **Primary color** | Your main brand color, used for the main action on each screen. | The Save and New task buttons. |
| **Neutrals** | Greys, white and near-black. They make up most of any screen. | Backgrounds, borders, body text. |
| **Semantic colors** | Colors that carry meaning: red for danger, green for success, amber for warning. | Overdue badge, Done status, High priority. |
| **Theme** | A full set of colors for one look. | Light theme and dark theme. |
| **Design token** | A named value you reuse, like `primary` or `surface`, instead of typing a raw color each time. | Change `primary` once and every button updates. |
| **Component** | A reusable piece of interface. | Button, Badge, Modal, TaskCard. |
| **Affordance** | A visual hint that something can be clicked. | A button looks pressable. A plain label does not. |
| **States** | The different looks one element can have. | A button is default, hovered, focused, pressed, disabled. |
| **Focus ring** | The outline that shows which element the keyboard is on. Never remove it. | Tabbing through the Move to menu. |
| **Responsive** | The layout adapts to the screen width. | Your phone-first board. |
| **Breakpoint** | The screen width where the layout changes. | In Tailwind, `md:` kicks in at 768px. |
| **Mobile first** | Style the phone layout first, then add rules for wider screens. | Plain classes are phone, `md:` and `lg:` add desktop. |
| **Empty state** | What a screen shows when there is nothing to list yet. | "No tasks yet" with a hint. |
| **Wireframe / mockup / prototype** | Rough layout, then real colors and fonts, then clickable. You finished the first. | Your Excalidraw frames. |

The three you will use daily are **spacing**, **contrast** and **hierarchy**. If a screen looks wrong, it is almost always one of those.

## How to pick colors without being a designer

Color feels like the scary part, but you can follow a recipe. Four steps get you a complete palette.

### Step 1: Pick one main color

Choose one hue and stop. For a work tool like yours, blue is the safe choice: it reads as calm and trustworthy, and it is what Trello, Jira and Linear-style apps lean on. Green, purple and teal also work. Avoid red as the main color, because red already means danger and overdue in your app.

In Tailwind each color has shades from 50 (almost white) to 950 (almost black). You will use only three or four shades of your main color: a mid shade for buttons, a darker one for hover, and a very light one for backgrounds and tags.

### Step 2: Add neutrals

Neutrals will cover about 90% of your screen. Use Tailwind's `slate` family: it is a grey with a slight blue tint that sits well beside blue. Near-black text is `slate-900`, quiet text is `slate-600`, borders are `slate-200`, and the page background is `slate-50`.

### Step 3: Add status colors, and only for meaning

Red, amber and green are reserved for things that mean something: red for overdue and high priority, amber for medium priority or a deadline getting close, green for done. If you also use them for decoration, the signal gets lost.

Never use color alone to carry meaning. About 1 in 12 men has some color blindness, so pair every colored badge with a word, like a red badge that says **Overdue**.

### Step 4: Check contrast

Text needs a contrast ratio of at least 4.5 to 1 against its background to pass WCAG AA, which is the standard in your requirements. Browser dev tools show the ratio when you inspect an element, and the palette in the next sections has already been checked.

### The 60-30-10 rule

A simple way to balance a screen: about 60% neutral background, 30% secondary surfaces like cards and borders, and 10% accent, which is your main color. If the screen feels loud, you probably used too much accent. If it feels dull, add a little more where the user should click.

## Light theme vs dark theme

A dark theme is not the light theme with colors inverted. It is a second palette built with its own rules. Your app can ship with light only, and dark mode stays an optional extra in TD-19, so treat this section as something to read now and use later.

### The rules that make dark mode look right

1. **Do not use pure black.** Use a very dark slate, like `slate-900`, for the page background. Pure black next to white text feels harsh and makes the screen look like it is vibrating.
2. **Raise surfaces by making them lighter.** In light mode a card sits on a grey page and gets a shadow. In dark mode a card is a slightly lighter slate (`slate-800`) than the page (`slate-900`), because shadows are almost invisible on dark backgrounds.
3. **Do not use pure white text.** Use `slate-100` for main text and `slate-400` for quiet text.
4. **Use lighter shades of your colors.** Blue-600 looks great on white, but on a dark background blue-400 is easier to read. The same goes for red, amber and green text.
5. **Keep button text readable.** White on blue-600 passes contrast, but white on the lighter blue-500 does not (3.7 to 1). So the main button stays blue-600 in both themes.
6. **Borders get quieter.** Use `slate-700` in dark mode instead of `slate-200`.

### How the two themes line up

| Job | Light theme | Dark theme |
| --- | --- | --- |
| Page background | `slate-50` | `slate-900` |
| Card / surface | `white` | `slate-800` |
| Main text | `slate-900` | `slate-100` |
| Quiet text | `slate-600` | `slate-400` |
| Border | `slate-200` | `slate-700` |
| Link / accent text | `blue-700` | `blue-400` |
| Button background | `blue-600` | `blue-600` |

The jobs stay the same and only the values change. That is the whole idea behind a theme.

### Which should be the default?

Start with light. It is easier to design, easier to screenshot for your README, and most reviewers open demos in light. Then offer dark as a toggle, and let the browser's own preference (`prefers-color-scheme`) choose the first time someone visits. Remember their choice after that, which is what your `prefs` slice is for.

## Your palette for Team Task Dashboard

Here is a ready palette: blue as the main color, slate for neutrals, and four status colors. Every text and background pair below was checked against the 4.5 to 1 contrast rule. You can see all of it, with a light and dark toggle, on the separate palette page that comes with this guide.

### Core colors

The light and dark values for these are in the theme table in the previous section. The only extra rule is that the main button is `bg-blue-600 text-white` in both themes, with `hover:bg-blue-700`.

### Status colors for badges

Badges use a very light background with dark text in light mode, and a very dark background with light text in dark mode. Each one always includes a word, so color is never the only signal.

| Meaning | Light theme classes | Dark theme classes |
| --- | --- | --- |
| To Do | `bg-slate-100 text-slate-700` | `dark:bg-slate-700 dark:text-slate-300` |
| In Progress | `bg-blue-100 text-blue-800` | `dark:bg-blue-950 dark:text-blue-300` |
| In Review | `bg-violet-100 text-violet-700` | `dark:bg-violet-950 dark:text-violet-300` |
| Done | `bg-green-100 text-green-800` | `dark:bg-green-950 dark:text-green-300` |
| Overdue and High priority | `bg-red-100 text-red-800` | `dark:bg-red-950 dark:text-red-300` |
| Medium priority and deadline close | `bg-amber-100 text-amber-800` | `dark:bg-amber-950 dark:text-amber-300` |

Low priority reuses the To Do grey, since it is the least urgent thing on the screen.

### Two things the contrast check taught me

- **Plain green-600 and amber-600 text fail on white** (3.3 and 3.2 to 1). That is why the badges above use the 800 shades, and why any green or amber text outside a badge should be `green-700` or `amber-700` (both 5.0 to 1).
- **Borders and card edges are decorative,** so they are allowed to be quiet. Only text and icons that carry meaning must reach 4.5 to 1.

### Tip: name your colors by job, not by shade

Instead of writing `bg-slate-50` in fifty places, define names like `surface` and `page` once in your Tailwind setup and use those. When you later tweak a shade, you change one line. The Tailwind section later in this guide shows how.

## Fonts, sizes and spacing

Colors get the attention, but spacing and type do more to make an app look professional. Amateur screens usually have inconsistent gaps and too many font sizes.

### Fonts: keep the default

Tailwind's default `font-sans` uses the system font of each device (San Francisco on Apple, Segoe UI on Windows, Roboto on Android). It loads instantly, looks native and needs no setup. If you later want a more distinctive look, Inter is the common free choice, but it is optional. Never mix more than two fonts.

### A type scale with five sizes

Pick sizes from a short list and never invent in-between values.

| Use | Tailwind class | Size |
| --- | --- | --- |
| Small print: dates, badges, hints | `text-sm` | 14px |
| Body text, form inputs | `text-base` | 16px |
| Card titles, section headings | `text-lg font-semibold` | 18px |
| Page headings | `text-2xl font-bold` | 24px |
| Big numbers on summary cards | `text-3xl font-bold` | 30px |

Keep form inputs at 16px or larger. Safari on iPhone zooms the page in when you tap an input with smaller text, which feels broken.

For weight, use only three: normal for body, `font-medium` for labels, `font-semibold` or `font-bold` for headings. Hierarchy comes from size and weight together: a heading is bigger and bolder, a hint is smaller and greyer.

### Spacing: use steps of 4px

Tailwind spacing numbers are multiples of 4px: `2` is 8px, `4` is 16px, `6` is 24px. Choose from the same few values everywhere and your layout will feel tidy without effort.

| Where | Class | Size |
| --- | --- | --- |
| Between an icon and its label | `gap-2` | 8px |
| Between cards in a list | `gap-3` | 12px |
| Inside a card | `p-4` | 16px |
| Between page sections | `gap-6` | 24px |
| Page edge on a phone | `px-4` | 16px |

The rule of thumb: things that belong together sit closer than things that do not. A task card's title and due date are 4 to 8px apart, while two different cards are 12px apart.

### Make touch targets big enough

On a phone, buttons and menu items should be about 44px tall so a thumb can hit them. In Tailwind that is roughly `min-h-11` (44px). This matters for your Move to button, since it is the main action for employees on mobile.

## Tools worth knowing

You need very few. Start with the first three, which are already built into things you use, and add the others only when you feel the need.

| Tool | What it is for | When to reach for it |
| --- | --- | --- |
| **Browser DevTools** | Right-click, Inspect. Shows an element's colors, spacing and contrast ratio, and lets you try changes live. | Every day. |
| **Tailwind docs, Colors page** | Every shade of every Tailwind color, with the class names. | When picking or swapping a shade. |
| **Tailwind CSS IntelliSense** | A VS Code extension that autocompletes class names and shows the color next to them. | Install it now. |
| **WebAIM Contrast Checker** (webaim.org) | Type two colors, get the ratio and a pass or fail for AA. | When you step outside the checked palette. |
| **Realtime Colors** (realtimecolors.com) | Pick a few colors and instantly see them on a sample page, in light and dark. | When you want to try a different main color. |
| **Coolors** (coolors.co) | Generates palettes you can lock and shuffle. | For inspiration, not for final decisions. |
| **Lucide** (lucide.dev) or **Heroicons** | Free icon sets with React components. | When your wireframe needs the sun, moon and menu icons. |
| **Excalidraw** | Rough sketches and flows. | What you used for wireframes. |
| **Figma** | Detailed mockups and clickable prototypes. | Later, if you ever want it. Not needed here. |

One habit that beats any tool: look at apps you like, such as Linear, Trello, Notion and GitHub, and ask the three questions from the start of this guide. What is their main color? How big is their text? How much space is between things? Copying structure is how every designer learns.

## Using all this in Tailwind

This setup is for current Tailwind (version 4), where configuration lives in your CSS file instead of a `tailwind.config.js`. Check the version TD-1 installs, because older tutorials show a different setup.

### Step 1: Name your colors by job

Put this in your main CSS file. The first block holds the light values, the second block overrides them when the `dark` class is on the page, and the last block turns them into class names like `bg-surface` and `text-ink`.

```css
@import "tailwindcss";

/* lets dark: classes follow a .dark class instead of the OS setting */
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --page: var(--color-slate-50);
  --surface: var(--color-white);
  --text: var(--color-slate-900);
  --muted: var(--color-slate-600);
  --border: var(--color-slate-200);
  --link: var(--color-blue-700);
}

.dark {
  --page: var(--color-slate-900);
  --surface: var(--color-slate-800);
  --text: var(--color-slate-100);
  --muted: var(--color-slate-400);
  --border: var(--color-slate-700);
  --link: var(--color-blue-400);
}

@theme inline {
  --color-page: var(--page);
  --color-surface: var(--surface);
  --color-ink: var(--text);
  --color-muted: var(--muted);
  --color-line: var(--border);
  --color-link: var(--link);
}
```

The payoff: when you write `bg-surface` and `text-ink`, dark mode works with no extra classes. You only need `dark:` prefixes for things that are not in this list, such as the status badges.

If a color ever comes out missing or wrong in the browser, replace that `var(--color-...)` line with the plain hex value from the palette page. That always works, and you can switch back later.

### Step 2: Switch themes by toggling one class

Dark mode turns on when the `<html>` element has `class="dark"`. Your TD-19 toggle will dispatch `setTheme`, and a small hook will add or remove that class. To avoid a white flash on load, apply the saved choice before the page paints, as the Tailwind docs show. Without a saved choice, follow the browser's own `prefers-color-scheme`.

### Step 3: A task card using the palette

This card uses every idea in this guide: named colors, the type scale, the spacing steps, a badge with a word on it, a 44px button and a visible focus outline.

```tsx
interface TaskCardProps {
  title: string;
  project: string;
  due: string;
  overdue: boolean;
}

export function TaskCard({ title, project, due, overdue }: TaskCardProps) {
  return (
    <article className="rounded-lg border border-line bg-surface p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-muted">{project}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          Medium
        </span>
        <span className="text-muted">Due {due}</span>
        {overdue && (
          <span className="rounded-full bg-red-100 px-2 py-0.5 font-medium text-red-800 dark:bg-red-950 dark:text-red-300">
            Overdue
          </span>
        )}
      </div>

      <button
        type="button"
        className="mt-4 min-h-11 rounded-md bg-blue-600 px-4 font-medium text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400"
      >
        Move to
      </button>
    </article>
  );
}
```

Do not build this yet. Build it when TD-12 needs task cards, and extract the badge into a shared `Badge` component the second time you copy it.

Sources: [Tailwind dark mode docs](https://tailwindcss.com/docs/dark-mode), [Tailwind theme variables docs](https://tailwindcss.com/docs/theme).

## Common beginner mistakes, and a checklist

Almost every ugly beginner screen comes from the same short list of slips.

1. **Too many colors.** Three different blues, two greens, and a purple for fun. Fix: only the palette in this guide.
2. **Random spacing.** `p-3` here, `p-5` there, `mt-7` somewhere else. Fix: use only the steps in the spacing table.
3. **Grey text that is too light.** Light grey on white looks elegant on your monitor and is unreadable in sunlight. Fix: nothing lighter than `slate-600` on white.
4. **Everything the same size and weight.** The eye has nowhere to start. Fix: one clear heading per screen, then quieter details.
5. **Color as the only signal.** A red dot with no word. Fix: always add text, like Overdue.
6. **Removing the focus outline.** It looks cleaner and locks out keyboard users. Fix: keep it, or restyle it, but never delete it.
7. **Pure black and pure white in dark mode.** Fix: `slate-900` and `slate-100`.
8. **Styling every page separately.** Fix: build Button, Badge and Modal once, and reuse them.
9. **Designing for desktop first.** Fix: phone layout first, then `md:` and `lg:` for wider screens.
10. **Polishing before the feature works.** Fix: your ticket plan already handles this, since dark mode and the audit come last.

### Before you commit a screen

- [ ] Only colors from the palette, and every status badge has a word.
- [ ] Text sizes come from the five-size scale.
- [ ] Gaps come from the spacing steps.
- [ ] One clear heading, and the main button stands out.
- [ ] Looks fine at 360px wide, with no sideways scrolling on the page.
- [ ] You can reach every button with the Tab key and see where you are.
- [ ] Empty, loading and error states have a friendly message.

## Practice exercises

Design skill comes from doing small things many times. Each of these takes 10 to 20 minutes.

- [ ] **Spot the three decisions.** Open Trello or GitHub and write down its main color, its text sizes and its spacing between cards. Do the same for one dark-mode screen.
- [ ] **Run a contrast check.** Open your login page in the browser, right-click the quiet text, choose Inspect, and read the contrast ratio. Fix anything under 4.5.
- [ ] **Try another main color.** Go to Realtime Colors, swap blue for green or purple, and look at the sample page in light and dark. Decide if you prefer it, then change nothing in the code yet.
- [ ] **Style one badge in both themes.** Build the Overdue badge, then add the `dark:` classes and check it in both modes.
- [ ] **Squint test.** Look at your finished Projects page and squint until the text blurs. You should still see what the heading is and where the main button is. If not, adjust size, weight or color.
- [ ] **Screenshot comparison.** Before and after you apply the spacing table to one screen, take a screenshot. Notice what changed, since that is the lesson.

When you finish TD-19, come back and compare the app you built with the palette page and the checklist above. Anything that does not match is your next small fix.
