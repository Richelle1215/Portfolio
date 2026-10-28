"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

type Project = {
  id: string;
  title: string;
  link: string;
};

type Props = {
  project: Project;
  onClose: () => void;
};

const kitchenCategories = [
  ["🍳", "Breakfast"], ["🥗", "Lunch"], ["🍽️", "Dinner"], ["🥒", "Appetizers"],
  ["🍰", "Desserts"], ["🍹", "Beverages"], ["🍲", "Soups"], ["🥙", "Salads"],
  ["🍝", "Pasta"], ["🍚", "Rice"], ["🍗", "Meat & Poultry"], ["🐟", "Seafood"],
  ["🥬", "Vegetarian"], ["🌱", "Vegan"], ["🥐", "Baking"], ["🔥", "Grilling"],
  ["👨‍🍳", "Cooking Techniques"], ["🌍", "Ethnic Cuisine"],
];

const sampleRecipes = [
  { title: "Lemon Herb Chicken", category: "Dinner", time: "35 min", author: "Mia Santos" },
  { title: "Garden Bowl", category: "Lunch", time: "20 min", author: "Noah Reyes" },
  { title: "Cinnamon French Toast", category: "Breakfast", time: "15 min", author: "Ava Cruz" },
];

export function ProjectPreview({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dialog.open) {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", closeOnEscape, true);
    return () => {
      document.removeEventListener("keydown", closeOnEscape, true);
      if (dialog.open) dialog.close();
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="preview-dialog"
      aria-labelledby="preview-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={`preview-shell${["budget-tracker", "pet-health"].includes(project.id) ? " preview-shell--phone" : ""}`}>
        <header className="preview-toolbar">
          <div className="preview-toolbar__identity">
            <span className="preview-live-dot" aria-hidden="true" />
            <span id="preview-title">{project.title}</span>
            <span className="preview-toolbar__mode">VIEW-ONLY RECREATION · LOCAL STATE ONLY</span>
          </div>
          <div className="preview-toolbar__actions">
            <a href={project.link} target="_blank" rel="noopener noreferrer">Source ↗</a>
            <button type="button" className="preview-close" aria-label="Close preview" onClick={onClose}>×</button>
          </div>
        </header>
        {project.id === "basic-ed" && <BasicEd />}
        {project.id === "smart-kitchen" && <SmartKitchen />}
        {project.id === "budget-tracker" && <BudgetTracker />}
        {project.id === "hayst" && <Hayst />}
        {project.id === "pet-health" && <PetHealth />}
        {project.id === "lumiere" && <Lumiere />}
      </div>
    </dialog>
  );
}

function BrowserCanvas({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <main className={`preview-browser ${className}`}><div className="preview-browser__chrome"><i /><i /><i /><span>local preview · no connection</span></div>{children}</main>;
}

function ScreenTabs({ items, selected, onSelect }: { items: string[]; selected: string; onSelect: (item: string) => void }) {
  return (
    <nav className="preview-tabs" aria-label="Preview screens">
      {items.map((item) => <button key={item} type="button" className={selected === item ? "is-selected" : ""} aria-current={selected === item ? "page" : undefined} onClick={() => onSelect(item)}>{item}</button>)}
    </nav>
  );
}

function BasicEd() {
  const [screen, setScreen] = useState("Welcome");
  return (
    <BrowserCanvas className="basic-ed">
      <div className="basic-ed__brand"><span className="basic-ed__mark">B</span><strong>BasicEd</strong><span>Laravel starter application</span></div>
      <ScreenTabs items={["Welcome", "Login", "Register", "Dashboard", "Pending Staff", "Profile"]} selected={screen} onSelect={setScreen} />
      {screen === "Welcome" && <section className="basic-ed__welcome"><div className="basic-ed__welcome-copy"><span className="basic-ed__eyebrow">THE LARAVEL FRAMEWORK</span><h1>Build something<br /><em>remarkable.</em></h1><p>This is the actual repository welcome screen: the Laravel starter page, not a library catalog.</p><div className="basic-ed__actions"><button type="button" onClick={() => setScreen("Login")}>Log in</button><button type="button" className="basic-ed__secondary" onClick={() => setScreen("Register")}>Register</button></div></div><div className="basic-ed__welcome-art"><span>laravel</span><b>✳</b><small>Application<br />framework</small></div></section>}
      {screen === "Login" && <GuestCard title="Log in" subtitle="Welcome back to BasicEd."><PreviewForm><label>Email address<input type="email" placeholder="name@example.com" /></label><label>Password<input type="password" placeholder="Password" /></label><label className="basic-ed__check"><input type="checkbox" /> Remember me</label><div className="basic-ed__form-row"><button type="button" className="basic-ed__text-button">Forgot your password?</button><button type="submit">Log in</button></div></PreviewForm><p className="basic-ed__hint">No account? <button type="button" onClick={() => setScreen("Register")}>Register</button></p></GuestCard>}
      {screen === "Register" && <GuestCard title="Create an account" subtitle="Join the BasicEd community."><PreviewForm><label>Name<input placeholder="Your name" /></label><label>Email address<input type="email" placeholder="name@example.com" /></label><label>Password<input type="password" placeholder="Password" /></label><label>Confirm password<input type="password" placeholder="Repeat password" /></label><label>Account type<select defaultValue="Student"><option>Student</option><option>Staff (Needs Approval)</option></select></label><button type="submit" className="basic-ed__full-button">Register</button></PreviewForm><p className="basic-ed__hint">Already registered? <button type="button" onClick={() => setScreen("Login")}>Log in</button></p></GuestCard>}
      {screen === "Dashboard" && <div className="basic-ed__app"><div className="basic-ed__nav"><strong>BasicEd</strong><button>Dashboard</button><button onClick={() => setScreen("Profile")}>Profile</button><button onClick={() => setScreen("Login")}>Log out</button></div><section className="basic-ed__dashboard"><h1>Dashboard</h1><div className="basic-ed__success">You’re logged in!</div></section></div>}
      {screen === "Pending Staff" && <BasicEdApprovals />}
      {screen === "Profile" && <GuestCard title="Profile" subtitle="Update your account information."><PreviewForm><label>Name<input defaultValue="Sample User" /></label><label>Email address<input type="email" defaultValue="sample@example.com" /></label><label>Current password<input type="password" placeholder="Current password" /></label><label>New password<input type="password" placeholder="New password" /></label><button type="submit" className="basic-ed__full-button">Save</button></PreviewForm></GuestCard>}
      <p className="preview-local-note">Local-only controls · Nothing is submitted or stored.</p>
    </BrowserCanvas>
  );
}

function PreviewForm({ children }: { children: ReactNode }) {
  return <form onSubmit={(event: FormEvent<HTMLFormElement>) => event.preventDefault()}>{children}</form>;
}

function GuestCard({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return <section className="basic-ed__guest-card"><h1>{title}</h1><p>{subtitle}</p>{children}</section>;
}

function BasicEdApprovals() {
  return <section className="basic-ed__app basic-ed__approvals"><div className="basic-ed__nav"><strong>BasicEd</strong><button>Dashboard</button><button className="is-current">Pending Staff</button><button>Profile</button><button>Log out</button></div><div className="basic-ed__dashboard"><h1>Pending Staff Approvals</h1><div className="basic-ed__table-head"><span>Name</span><span>Email</span><span>Registered</span><span>Actions</span></div><div className="basic-ed__empty">No pending staff approvals.</div></div></section>;
}

function SmartKitchen() {
  const [screen, setScreen] = useState("Home");
  const [sampleMode, setSampleMode] = useState(false);
  const [category, setCategory] = useState("");
  return (
    <BrowserCanvas className="smart-kitchen">
      <header className="kitchen-nav"><button className="kitchen-logo" onClick={() => setScreen("Home")}><span>SK</span> SmartKitchen</button><nav><button onClick={() => setScreen("Home")}>Home</button><button onClick={() => setScreen("Recipes")}>Recipes</button><button onClick={() => setScreen("Categories")}>Categories</button></nav><div><button className="kitchen-link">Sign in</button><button className="kitchen-signup">Sign up</button></div></header>
      {screen === "Home" && <section className="kitchen-home">
        <div className="kitchen-hero"><span className="kitchen-kicker">GOOD FOOD, GOOD MOOD</span><h1>Cook smarter<br />with <em>SmartKitchen</em></h1><p>Discover delicious recipes, share your culinary creations, and make every meal count.</p><div className="kitchen-hero__actions"><button onClick={() => setScreen("Recipes")}>Explore Recipes <span>→</span></button><button className="kitchen-outline" onClick={() => setScreen("Recipes")}>Share a Recipe</button></div><div className="kitchen-stats"><span><b>12K+</b> recipes explored</span><span><b>4.9/5</b> community rating</span><span><b>AI</b> kitchen assistant</span></div></div>
        <div className="kitchen-featured"><div className="kitchen-featured__top"><span>✦ TRENDING NOW</span><small>Fresh inspiration</small></div><article><span>01</span><div><b>Honey Garlic Salmon</b><small>by Chef Maria · 30 min</small></div><strong>↗</strong></article><article><span>02</span><div><b>Creamy Tuscan Pasta</b><small>by Marco Cooks · 25 min</small></div><strong>↗</strong></article><article><span>03</span><div><b>Matcha Cloud Pancakes</b><small>by Emi Tanaka · 20 min</small></div><strong>↗</strong></article><p>Trending recipe labels are static homepage content.</p></div>
        <section className="kitchen-features"><div><span>01 / DISCOVER</span><h2>A little more magic<br />in every meal.</h2></div><div className="kitchen-feature-grid">{[["🥬", "Smart Pantry"], ["🗓️", "Meal Planner"], ["✦", "AI Assistant"], ["◉", "Nutrition Analysis"], ["♡", "Community"], ["⚙", "Administration"]].map(([icon, label]) => <article key={label}><span>{icon}</span><b>{label}</b></article>)}</div></section>
        <div className="kitchen-cta"><b>Ready to cook something wonderful?</b><button onClick={() => setScreen("Recipes")}>Find your next recipe →</button></div>
      </section>}
      {screen === "Recipes" && <section className="kitchen-discovery"><div className="kitchen-discovery__heading"><span>FIND YOUR NEXT FAVORITE</span><h1>Explore recipes</h1><p>Search by recipe name or ingredient, then refine your results.</p></div><div className="kitchen-filters"><input aria-label="Search recipes or ingredients" placeholder="Search recipes or ingredients..." /><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">All categories</option>{kitchenCategories.map(([, name]) => <option key={name}>{name}</option>)}</select><select defaultValue=""><option value="">Any prep time</option><option>Under 30 minutes</option><option>Under 60 minutes</option></select></div><div className="kitchen-sort"><span>Showing recipes</span><div>{["Recent", "Popular", "Trending", "Top Rated"].map((item, index) => <button className={index === 0 ? "is-selected" : ""} key={item}>{item}</button>)}</div></div><div className="kitchen-empty"><span className="kitchen-empty__icon">⌕</span><h2>No recipes found</h2><p>There are no uploaded recipes to show yet. Try adjusting your search or check back later.</p><button onClick={() => setSampleMode((value) => !value)}>{sampleMode ? "Hide sample preview recipes" : "Show sample preview recipes"}</button><small>Sample recipes are illustrative fixtures, not repository records.</small></div>{sampleMode && <div className="kitchen-sample-label">SAMPLE PREVIEW DATA · LOCAL ONLY</div>}{sampleMode && <div className="kitchen-recipes">{sampleRecipes.filter((recipe) => !category || recipe.category === category).map((recipe) => <article key={recipe.title}><span>{recipe.category} · {recipe.time}</span><h3>{recipe.title}</h3><p>Shared by {recipe.author}</p></article>)}</div>}</section>}
      {screen === "Categories" && <section className="kitchen-categories"><div><span>EXPLORE BY MOOD</span><h1>Recipe categories</h1><p>Browse the 18 categories defined by the project’s category seeder.</p></div><div className="kitchen-category-grid">{kitchenCategories.map(([icon, name]) => <button type="button" key={name} onClick={() => { setCategory(name); setScreen("Recipes"); }}><span>{icon}</span><b>{name}</b><small>Browse category →</small></button>)}</div></section>}
      <footer className="kitchen-footer"><span>SmartKitchen</span><small>Preview only · account, recipe and database actions are disabled.</small></footer>
    </BrowserCanvas>
  );
}

function BudgetTracker() {
  const [tab, setTab] = useState<"Expense" | "Income">("Expense");
  const [starting, setStarting] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState<{ id: number; title: string; amount: number; date: string; type: "Expense" | "Income" }[]>([]);
  const income = transactions.filter((item) => item.type === "Income").reduce((total, item) => total + item.amount, 0);
  const expenses = transactions.filter((item) => item.type === "Expense").reduce((total, item) => total + item.amount, 0);
  const balance = Number(starting || 0) + income - expenses;
  const addTransaction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!description.trim() || Number(amount) <= 0) return;
    setTransactions((items) => [...items, { id: Date.now(), title: description.trim(), amount: Number(amount), date: new Date().toLocaleDateString(), type: tab }]);
    setDescription(""); setAmount("");
  };
  return <div className="android-stage"><div className="android-device budget-device"><div className="android-status"><span>9:41</span><span>● ● ▰</span></div><div className="budget-app"><header><span>☰</span><div><b>Budget Tracker</b><small>Personal Finance Manager</small></div><span>⋮</span></header><section className="budget-balance"><small>Available Balance</small><strong>₱{balance.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</strong><label>Starting amount <span>₱</span><input aria-label="Set starting amount" type="number" min="0" value={starting} onChange={(event) => setStarting(event.target.value)} placeholder="0.00" /></label></section><div className="budget-exports"><button type="button" title="No file is created">Export Excel · preview only</button><button type="button" title="No file is created">Export PDF · preview only</button></div><div className="budget-summary">{[["Starting Balance", Number(starting || 0), "◉"], ["Total Income", income, "↗"], ["Total Expenses", expenses, "↘"], ["Remaining Balance", balance, "◎"]].map(([label, value, icon]) => <article key={String(label)}><span>{icon}</span><div><small>{label}</small><b>₱{Number(value).toLocaleString("en-PH", { minimumFractionDigits: 2 })}</b></div></article>)}</div><section className="budget-progress"><div><b>Expenses vs Income</b><span>{income > 0 ? `${Math.min(100, Math.round(expenses / income * 100))}%` : "0%"}</span></div><div className="budget-track"><i style={{ width: `${income ? Math.min(100, expenses / income * 100) : 0}%` }} /></div><small>Track your spending at a glance</small></section><section className="budget-form"><h2>Add Transaction</h2><div className="budget-switch"><button type="button" className={tab === "Expense" ? "is-expense" : ""} onClick={() => setTab("Expense")}>Expense</button><button type="button" className={tab === "Income" ? "is-income" : ""} onClick={() => setTab("Income")}>Income</button></div><form onSubmit={addTransaction}><label>Description<input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="e.g. Groceries" /></label><div className="budget-form__row"><label>Amount<input type="number" min="0" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.00" /></label><label>Date<input type="date" defaultValue={new Date().toISOString().slice(0, 10)} /></label></div><label>Note<input placeholder="Optional note" /></label><button type="submit">Add {tab}</button></form></section><section className="budget-recent"><h2>Recent Transactions <small>{transactions.length}</small></h2>{transactions.length === 0 ? <p>No transactions yet.</p> : transactions.map((item) => <article key={item.id}><span className={item.type === "Income" ? "income" : "expense"}>{item.type === "Income" ? "↗" : "↘"}</span><div><b>{item.title}</b><small>{item.date}</small></div><strong className={item.type === "Income" ? "income" : "expense"}>{item.type === "Income" ? "+" : "−"}₱{item.amount.toFixed(2)}</strong><button type="button" aria-label={`Delete ${item.title}`} onClick={() => setTransactions((items) => items.filter((entry) => entry.id !== item.id))}>×</button></article>)}</section><p className="budget-local-note">Preview data lives only until this window closes.</p></div><div className="android-home-indicator" /></div></div>;
}

function Robot({ body = "#f4f4ef", eyes = "#18c7bd", headphones = "#4d83df", sunglasses = false, clothes = false }: { body?: string; eyes?: string; headphones?: string; sunglasses?: boolean; clothes?: boolean }) {
  return (
    <svg className="pet-robot" viewBox="0 0 220 205" role="img" aria-label="Friendly rounded robot pet">
      <ellipse cx="110" cy="188" rx="70" ry="10" fill="#172533" opacity=".12" />
      <path d="M56 70 Q56 34 110 34 Q164 34 164 70 L164 132 Q164 165 110 165 Q56 165 56 132Z" fill={body} stroke="#253447" strokeWidth="4" />
      <path d="M48 75 Q43 50 55 42 M172 75 Q177 50 165 42" fill="none" stroke={headphones} strokeWidth="12" strokeLinecap="round" />
      <rect x="49" y="77" width="17" height="37" rx="8" fill={headphones} />
      <rect x="154" y="77" width="17" height="37" rx="8" fill={headphones} />
      <rect x="75" y="78" width="70" height="47" rx="20" fill="#24354a" />
      <circle cx="94" cy="101" r="6" fill={eyes} />
      <circle cx="126" cy="101" r="6" fill={eyes} />
      {sunglasses && <g fill="none" stroke="#1b2632" strokeWidth="3"><rect x="82" y="90" width="24" height="20" rx="6" /><rect x="114" y="90" width="24" height="20" rx="6" /><path d="M106 96h8" /></g>}
      <path d="M97 139 Q110 149 123 139" fill="none" stroke="#253447" strokeWidth="4" strokeLinecap="round" />
      {clothes && <path d="M63 132 Q78 122 90 125 Q110 135 130 125 Q148 123 157 133 L153 159 Q110 174 67 159Z" fill="#e7797f" stroke="#9e4d59" strokeWidth="2" />}
      <path d="M84 165 L77 180 M136 165 L143 180" stroke="#253447" strokeWidth="7" strokeLinecap="round" />
      <circle cx="110" cy="24" r="5" fill="#f3a5b1" />
    </svg>
  );
}

function PetHealth() {
  const [screen, setScreen] = useState<"home" | "pet" | "games" | "closet">("home");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const robots = ["Emo", "Eilik", "CuteBot"];
  const [robotIndex, setRobotIndex] = useState(0);
  const robot = robots[robotIndex];
  const [bodyColor, setBodyColor] = useState("#f4f4ef");
  const [eyeColor, setEyeColor] = useState("#18c7bd");
  const [headphoneColor, setHeadphoneColor] = useState("#4d83df");
  const [sunglasses, setSunglasses] = useState(false);
  const [clothes, setClothes] = useState(false);
  const games = [["🐍", "Python", "Snakes & lambdas"], ["⌘", "Kotlin", "Android mastery"], ["◉", "JavaScript", "Web sorcery"], ["☕", "Java", "OOP fundamentals"], ["◇", "CS Basics", "Data structures & algos"]];
  const go = (next: typeof screen) => setScreen(next);
  return <div className="android-stage"><div className="android-device pet-device"><div className="android-status"><span>9:41</span><span>● ● ▰</span></div><div className="pet-app">
    {screen === "home" && <><div className="pet-home-actions"><button onClick={() => go("games")}>🎮 Games</button><button onClick={() => go("closet")}>👕 Closet</button><button disabled title="Settings is not implemented in the source app">⚙ Settings</button></div><div className="pet-home-center"><span className="pet-hello">YOUR ROBOT COMPANION</span><h1>Hello, friend!</h1><p>Let’s take care of your pet together.</p><div className="pet-home-robot"><Robot body={bodyColor} eyes={eyeColor} headphones={headphoneColor} sunglasses={sunglasses} clothes={clothes} /></div><p className="pet-bubble">Beep boop! Ready for today?</p></div><div className="pet-home-bottom"><button onClick={() => go("pet")}><span>♡</span><b>Pet Health</b><small>Check your pet’s BMI</small><i>→</i></button><button onClick={() => go("games")}><span>✦</span><b>Games</b><small>Learn something new</small><i>→</i></button></div></>}
    {screen === "pet" && <><button className="pet-back" onClick={() => go("home")}>‹ <span>Pet Health</span></button><div className="pet-screen-title"><span>WELLNESS CHECK</span><h1>Pet Health</h1><p>Enter your pet’s measurements to calculate BMI.</p></div><label className="pet-input">Height <span>(cm)</span><input type="number" min="1" value={height} onChange={(event) => setHeight(event.target.value)} placeholder="e.g. 25" /></label><label className="pet-input">Weight <span>(kg)</span><input type="number" min="0.1" step="0.1" value={weight} onChange={(event) => setWeight(event.target.value)} placeholder="e.g. 4.5" /></label><button className="pet-primary" onClick={() => { const meters = Number(height) / 100; setBmi(meters > 0 && Number(weight) > 0 ? Number((Number(weight) / meters ** 2).toFixed(1)) : null); }}>Calculate BMI</button>{bmi !== null && <div className="pet-bmi"><small>YOUR PET’S BMI</small><strong>{bmi}</strong><span>{bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal weight" : "Overweight"}</span></div>}</>}
    {screen === "games" && <><button className="pet-back" onClick={() => go("home")}>‹ <span>Games</span></button><div className="pet-screen-title"><span>LEARN & PLAY</span><h1>Mini Games</h1><p>Pick a topic and explore something new.</p></div><div className="pet-game-list">{games.map(([icon, language, title]) => <article key={language}><span>{icon}</span><div><small>{language}</small><b>{title}</b><em>8 questions · Multiple Choice</em></div><i>›</i></article>)}</div><p className="pet-game-note">Game cards are informational; the source has no quiz route.</p></>}
    {screen === "closet" && <><button className="pet-back" onClick={() => go("home")}>‹ <span>Closet</span></button><div className="pet-screen-title"><span>MAKE IT YOURS</span><h1>Robot Closet</h1></div><div className="pet-closet-robot"><Robot body={bodyColor} eyes={eyeColor} headphones={headphoneColor} sunglasses={sunglasses} clothes={clothes} /><span>{robot}</span></div><div className="pet-robot-carousel"><button aria-label="Previous robot" onClick={() => setRobotIndex((index) => (index + robots.length - 1) % robots.length)}>‹</button><b>{robot}</b><button aria-label="Next robot" onClick={() => setRobotIndex((index) => (index + 1) % robots.length)}>›</button></div><div className="pet-color-row"><b>Body</b>{["#f4f4ef", "#efadbd", "#91c5a5", "#e7bb67"].map((color) => <button key={color} style={{ background: color }} aria-label={`Set body color ${color}`} aria-pressed={bodyColor === color} onClick={() => setBodyColor(color)} />)}</div><div className="pet-color-row"><b>Eyes</b>{["#18c7bd", "#668df2", "#fc8b51", "#cc79db"].map((color) => <button key={color} style={{ background: color }} aria-label={`Set eye color ${color}`} aria-pressed={eyeColor === color} onClick={() => setEyeColor(color)} />)}</div><div className="pet-color-row"><b>Headphones</b>{["#4d83df", "#e5758b", "#6db38c", "#e7bb67"].map((color) => <button key={color} style={{ background: color }} aria-label={`Set headphone color ${color}`} aria-pressed={headphoneColor === color} onClick={() => setHeadphoneColor(color)} />)}</div><label className="pet-toggle"><span>Sunglasses</span><input type="checkbox" checked={sunglasses} onChange={(event) => setSunglasses(event.target.checked)} /></label><label className="pet-toggle"><span>Clothes</span><input type="checkbox" checked={clothes} onChange={(event) => setClothes(event.target.checked)} /></label><small className="pet-accessory-note">{sunglasses || clothes ? "Accessory toggle preview" : "Accessories are off"}</small></>}
  </div><div className="android-home-indicator" /></div></div>;
}

function Hayst() {
  return <BrowserCanvas className="hayst-site"><header className="hayst-nav"><a className="hayst-logo" href="#hayst-top">HAYST<span>.</span></a><nav><a href="#hayst-benefits">Why HAYST</a><a href="#hayst-categories">Categories</a><a href="#hayst-seller">Sell with us</a></nav><a className="hayst-nav-cta" href="#hayst-categories">Explore</a></header><section className="hayst-hero" id="hayst-top"><span>THE MARKETPLACE FOR EVERYDAY FINDS</span><h1>Welcome to<br /><em>HAYST</em></h1><p>Discover great products from sellers you can trust.</p><a href="#hayst-categories">Explore categories <b>↓</b></a><div className="hayst-hero-sticker">find<br />your<br />thing!</div></section><section id="hayst-benefits" className="hayst-benefits"><div><span>THE HAYST DIFFERENCE</span><h2>Shopping made<br />a little easier.</h2></div><div className="hayst-benefit-cards"><article><b>01</b><strong>Fast &amp; Reliable</strong><p>Find what you need with a smooth, dependable marketplace experience.</p></article><article><b>02</b><strong>Great Prices</strong><p>Browse a variety of products and discover everyday value.</p></article><article><b>03</b><strong>Secure &amp; Safe</strong><p>Shop with confidence through a trusted marketplace experience.</p></article></div></section><section id="hayst-categories" className="hayst-categories"><div><span>FIND YOUR NEXT FAVORITE</span><h2>Shop by category</h2></div><div className="hayst-category-cards">{[["01", "Electronics", "⌁"], ["02", "Fashion", "✳"], ["03", "Home & Garden", "⌂"], ["04", "Sports", "↗"]].map(([num, name, icon]) => <article key={name}><span>{num}</span><b>{icon}</b><h3>{name}</h3><small>Browse collection ↗</small></article>)}</div></section><section id="hayst-seller" className="hayst-seller"><span>GROW WITH US</span><h2>Have something<br />to sell?</h2><p>Become a seller and bring your products to the HAYST community.</p><button type="button">Become a Seller <span>→</span></button><small>Static landing-page preview · seller action is not connected</small></section><footer className="hayst-footer"><strong>HAYST<span>.</span></strong><span>© 2026 HAYST. All rights reserved.</span><a href="#hayst-top">Back to top ↑</a></footer></BrowserCanvas>;
}

function Lumiere() {
  const [screen, setScreen] = useState("Home");
  const [category, setCategory] = useState("All jewelry");
  const [menuOpen, setMenuOpen] = useState(false);
  return <BrowserCanvas className="lumiere-site"><header className="lumiere-nav"><button className="lumiere-menu" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen}>☰ <span>Menu</span></button><button className="lumiere-wordmark" onClick={() => setScreen("Home")}>LUMIÈRE</button><div><button onClick={() => setScreen("Collection")}>Search</button><button disabled title="Cart is not connected">Bag (0)</button></div>{menuOpen && <div className="lumiere-menu-panel">{["All jewelry", "Necklaces", "Earrings", "Rings", "Bracelets"].map((name) => <button key={name} onClick={() => { setCategory(name); setScreen("Collection"); setMenuOpen(false); }}>{name}</button>)}</div>}</header>{screen === "Home" && <><section className="lumiere-hero"><img src="/project-previews/lumiere-cover.webp" alt="LUMIÈRE storefront cover image" /><div><span>THE ART OF EVERYDAY ELEGANCE</span><h1>Timeless<br /><em>Elegance</em></h1><p>Jewelry made to be treasured, designed to become part of your story.</p><button onClick={() => setScreen("Collection")}>Discover the collection <span>→</span></button></div></section><section className="lumiere-collection"><div><span>CURATED FOR YOU</span><h2>Our Collection</h2></div><button onClick={() => setScreen("Collection")}>View all jewelry <span>↗</span></button><div className="lumiere-empty"><span>✳</span><h3>No Products Available</h3><p>Our collection is currently being curated. Please check back soon for exquisite pieces.</p><small>Product cards depend on database records not included in this repository.</small></div></section></>}{screen === "Collection" && <section className="lumiere-catalog"><div className="lumiere-breadcrumb"><button onClick={() => setScreen("Home")}>Home</button> / Shop / {category}</div><span>DISCOVER LUMIÈRE</span><h1>Our Collection</h1><p>Timeless pieces, thoughtfully selected.</p><div className="lumiere-catalog__tools"><select value={category} onChange={(event) => setCategory(event.target.value)}>{["All jewelry", "Necklaces", "Earrings", "Rings", "Bracelets"].map((name) => <option key={name}>{name}</option>)}</select><button>Sort by: Featured⌄</button></div><div className="lumiere-empty"><span>✳</span><h3>No Products Available</h3><p>No pieces are available in this category right now.</p><small>There are no seeded products in the source repository.</small></div></section>}<footer className="lumiere-footer"><strong>LUMIÈRE</strong><small>Jewelry for every chapter.</small><span>Customer care · Shipping &amp; returns</span></footer><div className="lumiere-preview-note">VIEW-ONLY · Login, cart, checkout and payment are not connected.</div></BrowserCanvas>;
}
