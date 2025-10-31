// Main JavaScript file for TradePro Trading Platform
document.addEventListener("DOMContentLoaded", function () {
  console.log("TradePro Trading Platform loaded!");

  // Initialize all functionality
  initializeIntersectionObserver();
  initializeNavigation();
  initializeCounters();
  initializeTradingFunctionality();
  initializeCurrencies();
  initializeExpenseTracker();
  initializeDashboard();
  initializePortfolio();
  initializeModals();
  initializeCharts();
  initializePurchases();
  initializeShowMore();

  // Add smooth scrolling
  initializeSmoothScrolling();
});

// Initialize counters for statistics
function initializeCounters() {
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    counter.textContent = "0";
  });
}

// Intersection Observer for animations
function initializeIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Trigger counter animation for stat numbers
        if (entry.target.classList.contains("stat-number")) {
          animateCounter(entry.target);
        }

        // Add stagger effect for grid items
        if (
          entry.target.classList.contains("trading-card") ||
          entry.target.classList.contains("dashboard-card") ||
          entry.target.classList.contains("portfolio-card") ||
          entry.target.classList.contains("currency-card")
        ) {
          const delay =
            Array.from(entry.target.parentNode.children).indexOf(entry.target) *
            100;
          setTimeout(() => {
            entry.target.style.animationDelay = "0s";
            entry.target.classList.add("animate-in");
          }, delay);
        }
      }
    });
  }, observerOptions);

  // Observe all elements that should animate
  const animatedElements = document.querySelectorAll(`
        .hero-content, .hero-image, .hero-stats,
        .trading-card, .dashboard-card, .portfolio-card, .currency-card,
        .expense-form, .expense-summary, .section-title,
        .stat-number, .portfolio-allocation
    `);

  animatedElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
}

// Navigation functionality
function initializeNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger?.classList.remove("active");
      navMenu?.classList.remove("active");
    });
  });

  // Highlight active nav item based on scroll position
  window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Counter animation
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    if (target >= 1000000) {
      element.textContent = (current / 1000000).toFixed(1) + "M";
    } else if (target >= 1000) {
      element.textContent = (current / 1000).toFixed(0) + "K";
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Currency data with current market prices and new coins
const currencyData = {
  BTC: {
    name: "Bitcoin",
    symbol: "BTC",
    price: 67234.5,
    change: 2.34,
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    marketCap: "$1.32T",
    volume24h: "$31.2B",
    high24h: "$68,123.45",
    low24h: "$65,890.12",
  },
  ETH: {
    name: "Ethereum",
    symbol: "ETH",
    price: 3456.78,
    change: 1.87,
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    marketCap: "$415.6B",
    volume24h: "$18.7B",
    high24h: "$3,512.34",
    low24h: "$3,398.12",
  },
  ADA: {
    name: "Cardano",
    symbol: "ADA",
    price: 0.5234,
    change: -0.89,
    icon: "https://cryptologos.cc/logos/cardano-ada-logo.png",
    marketCap: "$18.3B",
    volume24h: "$1.2B",
    high24h: "$0.5378",
    low24h: "$0.5145",
  },
  DOT: {
    name: "Polkadot",
    symbol: "DOT",
    price: 7.89,
    change: 3.21,
    icon: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
    marketCap: "$11.2B",
    volume24h: "$567.8M",
    high24h: "$8.12",
    low24h: "$7.54",
  },
  EUR: {
    name: "Euro",
    symbol: "EUR/USD",
    price: 1.0734,
    change: -0.12,
    flag: "🇪🇺",
    marketCap: "N/A",
    volume24h: "$2.3T",
    high24h: "$1.0756",
    low24h: "$1.0712",
  },
  GBP: {
    name: "British Pound",
    symbol: "GBP/USD",
    price: 1.2567,
    change: 0.23,
    flag: "🇬🇧",
    marketCap: "N/A",
    volume24h: "$1.9T",
    high24h: "$1.2589",
    low24h: "$1.2534",
  },
  SOL: {
    name: "Solana",
    symbol: "SOL",
    price: 98.45,
    change: 4.12,
    icon: "https://cryptologos.cc/logos/solana-sol-logo.png",
    marketCap: "$42.8B",
    volume24h: "$2.1B",
    high24h: "$101.23",
    low24h: "$94.56",
  },
  MATIC: {
    name: "Polygon",
    symbol: "MATIC",
    price: 0.8923,
    change: -1.45,
    icon: "https://cryptologos.cc/logos/polygon-matic-logo.png",
    marketCap: "$8.2B",
    volume24h: "$456.7M",
    high24h: "$0.9234",
    low24h: "$0.8756",
  },
  AVAX: {
    name: "Avalanche",
    symbol: "AVAX",
    price: 34.67,
    change: 2.89,
    icon: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
    marketCap: "$12.7B",
    volume24h: "$678.9M",
    high24h: "$36.12",
    low24h: "$33.45",
  },
  LINK: {
    name: "Chainlink",
    symbol: "LINK",
    price: 14.56,
    change: 1.78,
    icon: "https://cryptologos.cc/logos/chainlink-link-logo.png",
    marketCap: "$8.5B",
    volume24h: "$345.2M",
    high24h: "$14.89",
    low24h: "$14.12",
  },
  UNI: {
    name: "Uniswap",
    symbol: "UNI",
    price: 6.78,
    change: -2.34,
    icon: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
    marketCap: "$4.1B",
    volume24h: "$123.4M",
    high24h: "$7.02",
    low24h: "$6.54",
  },
  LTC: {
    name: "Litecoin",
    symbol: "LTC",
    price: 72.34,
    change: 0.89,
    icon: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
    marketCap: "$5.3B",
    volume24h: "$234.5M",
    high24h: "$73.45",
    low24h: "$71.23",
  },
};

// Show More functionality
function initializeShowMore() {
  const showMoreBtn = document.getElementById("showMoreBtn");
  const hiddenCurrencies = document.getElementById("hiddenCurrencies");
  let isExpanded = false;

  showMoreBtn?.addEventListener("click", () => {
    isExpanded = !isExpanded;

    if (isExpanded) {
      hiddenCurrencies.classList.add("show");
      showMoreBtn.innerHTML =
        '<i class="fas fa-minus"></i> Show Less Currencies';

      // Initialize charts for newly shown currencies
      setTimeout(() => {
        const newCurrencies = ["SOL", "MATIC", "AVAX", "LINK", "UNI", "LTC"];
        newCurrencies.forEach((currency) => {
          const canvas = document.getElementById(
            `${currency.toLowerCase()}-chart`
          );
          if (canvas) {
            drawMiniChart(canvas, currency);
          }
        });
      }, 100);
    } else {
      hiddenCurrencies.classList.remove("show");
      showMoreBtn.innerHTML =
        '<i class="fas fa-plus"></i> Show More Currencies';
    }
  });
}

// Initialize currencies functionality
function initializeCurrencies() {
  // Search functionality
  const searchBtn = document.getElementById("searchCurrencyBtn");
  const searchInput = document.getElementById("currencySearch");

  searchBtn?.addEventListener("click", handleCurrencySearch);
  searchInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleCurrencySearch();
    }
  });

  // View details buttons
  const viewDetailsButtons = document.querySelectorAll(".view-details");
  viewDetailsButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const currency = e.target.getAttribute("data-currency");
      openCurrencyModal(currency);
    });
  });

  // Initialize currency charts and update prices immediately
  initializeCurrencyCharts();
  updateCurrencyPrices();

  // Update currency prices periodically
  setInterval(updateCurrencyPrices, 3000);
}

function handleCurrencySearch() {
  const searchTerm = document
    .getElementById("currencySearch")
    .value.toUpperCase();

  if (currencyData[searchTerm]) {
    showMessage(
      `Found ${currencyData[searchTerm].name} (${searchTerm})`,
      "success"
    );

    // Show hidden currencies if searching for one of them
    const hiddenCurrencies = ["SOL", "MATIC", "AVAX", "LINK", "UNI", "LTC"];
    if (hiddenCurrencies.includes(searchTerm)) {
      const hiddenSection = document.getElementById("hiddenCurrencies");
      const showMoreBtn = document.getElementById("showMoreBtn");
      if (!hiddenSection.classList.contains("show")) {
        hiddenSection.classList.add("show");
        showMoreBtn.innerHTML =
          '<i class="fas fa-minus"></i> Show Less Currencies';
      }
    }

    // Scroll to the currency card
    const currencyCard = document.querySelector(
      `[data-symbol="${searchTerm}"]`
    );
    if (currencyCard) {
      currencyCard.scrollIntoView({ behavior: "smooth", block: "center" });
      currencyCard.style.animation = "pulse 1s ease";
      setTimeout(() => {
        currencyCard.style.animation = "";
      }, 1000);
    }
  } else {
    showMessage(
      `Currency "${searchTerm}" not found. Try BTC, ETH, ADA, DOT, EUR, GBP, SOL, MATIC, AVAX, LINK, UNI, or LTC.`,
      "error"
    );
  }
}

function openCurrencyModal(currency) {
  const modal = document.getElementById("currencyModal");
  const data = currencyData[currency];

  if (!data) return;

  // Update modal content
  document.getElementById(
    "currencyModalTitle"
  ).textContent = `${data.name} Details`;
  document.getElementById("currencyModalName").textContent = data.name;
  document.getElementById("currencyModalSymbol").textContent = data.symbol;
  document.getElementById(
    "currencyModalPrice"
  ).textContent = `$${data.price.toLocaleString()}`;

  const changeElement = document.getElementById("currencyModalChange");
  changeElement.textContent = `${data.change > 0 ? "+" : ""}${data.change}%`;
  changeElement.className = `change ${
    data.change > 0 ? "positive" : "negative"
  }`;

  // Update icon or flag
  const iconElement = document.getElementById("currencyModalIcon");
  if (data.icon) {
    iconElement.src = data.icon;
    iconElement.style.display = "block";
  } else {
    iconElement.style.display = "none";
  }

  // Update stats
  document.getElementById("marketCap").textContent = data.marketCap;
  document.getElementById("volume24h").textContent = data.volume24h;
  document.getElementById("high24h").textContent = data.high24h;
  document.getElementById("low24h").textContent = data.low24h;

  // Show modal
  modal.style.display = "block";

  // Initialize detailed chart
  setTimeout(() => {
    initializeCurrencyDetailChart(currency);
  }, 100);

  showMessage(`Viewing ${data.name} details`, "success");
}

function initializeCurrencyCharts() {
  const currencies = [
    "BTC",
    "ETH",
    "ADA",
    "DOT",
    "EUR",
    "GBP",
    "SOL",
    "MATIC",
    "AVAX",
  ];

  currencies.forEach((currency) => {
    const canvas = document.getElementById(`${currency.toLowerCase()}-chart`);
    if (canvas) {
      drawMiniChart(canvas, currency);
    }
  });
}

function drawMiniChart(canvas, currency) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Generate sample data based on currency trend
  const dataPoints = 20;
  const data = [];
  let value = 100;
  const trend = currencyData[currency]?.change > 0 ? 1 : -1;

  for (let i = 0; i < dataPoints; i++) {
    value += (Math.random() - 0.4) * 8 + trend * 0.5;
    data.push(Math.max(20, Math.min(180, value)));
  }

  // Draw chart line
  const color = currencyData[currency]?.change > 0 ? "#00ff88" : "#ff4444";
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();

  data.forEach((point, index) => {
    const x = (index / (dataPoints - 1)) * width;
    const y = height - ((point - 20) / 160) * height;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();

  // Add glow effect
  ctx.shadowColor = color;
  ctx.shadowBlur = 5;
  ctx.stroke();
}

function initializeCurrencyDetailChart(currency) {
  const canvas = document.getElementById("currencyDetailChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // Generate more detailed sample data
  const dataPoints = 50;
  const data = [];
  let value = 100;
  const trend = currencyData[currency]?.change > 0 ? 1 : -1;

  for (let i = 0; i < dataPoints; i++) {
    value += (Math.random() - 0.45) * 6 + trend * 0.3;
    data.push(Math.max(30, Math.min(170, value)));
  }

  // Clear and draw detailed chart
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw grid
  ctx.strokeStyle = "rgba(0, 255, 136, 0.1)";
  ctx.lineWidth = 1;

  // Vertical grid lines
  for (let i = 0; i <= 10; i++) {
    const x = (i / 10) * canvas.width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // Horizontal grid lines
  for (let i = 0; i <= 5; i++) {
    const y = (i / 5) * canvas.height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Draw price line
  const color = currencyData[currency]?.change > 0 ? "#00ff88" : "#ff4444";
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();

  data.forEach((point, index) => {
    const x = (index / (dataPoints - 1)) * canvas.width;
    const y = canvas.height - ((point - 30) / 140) * canvas.height;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();

  // Add area fill
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = color;
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
}

function updateCurrencyPrices() {
  Object.keys(currencyData).forEach((currency) => {
    const data = currencyData[currency];
    const change = (Math.random() - 0.5) * 0.02;
    const newPrice = data.price * (1 + change);
    const newChange = data.change + (Math.random() - 0.5) * 0.5;

    // Update price
    data.price = newPrice;
    data.change = newChange;

    // Update DOM elements
    const priceElement = document.getElementById(
      `${currency.toLowerCase()}-price`
    );
    const changeElement = document.getElementById(
      `${currency.toLowerCase()}-change`
    );
    const trendElement = document.getElementById(
      `${currency.toLowerCase()}-trend`
    );

    if (priceElement) {
      if (currency === "EUR" || currency === "GBP") {
        priceElement.textContent = `$${newPrice.toFixed(4)}`;
      } else if (
        currency === "ADA" ||
        currency === "MATIC" ||
        currency === "UNI"
      ) {
        priceElement.textContent = `$${newPrice.toFixed(4)}`;
      } else {
        priceElement.textContent = `$${newPrice.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      }

      // Add flash animation
      priceElement.style.background =
        change > 0 ? "rgba(0, 255, 136, 0.3)" : "rgba(255, 68, 68, 0.3)";
      setTimeout(() => {
        priceElement.style.background = "";
      }, 500);
    }

    if (changeElement) {
      changeElement.textContent = `${
        newChange > 0 ? "+" : ""
      }${newChange.toFixed(2)}%`;
      changeElement.className = `change ${
        newChange > 0 ? "positive" : "negative"
      }`;
    }

    if (trendElement) {
      trendElement.className = `trend-indicator ${
        newChange > 0 ? "rising" : "falling"
      }`;
      trendElement.innerHTML = `<i class="fas fa-arrow-${
        newChange > 0 ? "up" : "down"
      }"></i>`;
    }

    // Update mini chart
    const canvas = document.getElementById(`${currency.toLowerCase()}-chart`);
    if (canvas) {
      drawMiniChart(canvas, currency);
    }
  });
}

// Trading functionality
function initializeTradingFunctionality() {
  const tradeButtons = document.querySelectorAll(".btn-trade");
  const heroButtons = document.querySelectorAll(
    "#startTradingBtn, #viewDashboardBtn"
  );

  // Trading card buttons
  tradeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const action = e.target.getAttribute("data-action");
      const card = e.target.closest(".trading-card");
      const market = card.getAttribute("data-market");

      // Add click animation
      button.style.transform = "scale(0.95)";
      setTimeout(() => {
        button.style.transform = "";
      }, 150);

      openTradingModal(market, action);
      showMessage(`Opening ${market} trading interface...`, "success");
    });
  });

  // Hero buttons
  document.getElementById("startTradingBtn")?.addEventListener("click", () => {
    document.getElementById("trading").scrollIntoView({ behavior: "smooth" });
    showMessage(
      "Welcome to TradePro! Select a market to start trading.",
      "success"
    );
  });

  document.getElementById("viewDashboardBtn")?.addEventListener("click", () => {
    document.getElementById("dashboard").scrollIntoView({ behavior: "smooth" });
    showMessage("Dashboard loaded successfully!", "success");
  });

  // Update market prices periodically
  setInterval(updateMarketPrices, 5000);
}

// Trading modal functionality
function openTradingModal(market, action) {
  const modal = document.getElementById("tradingModal");
  const modalTitle = document.getElementById("modalTitle");
  const tradeSymbol = document.getElementById("tradeSymbol");

  modalTitle.textContent = `Trade ${
    market.charAt(0).toUpperCase() + market.slice(1)
  }`;

  // Set default symbol based on market
  const defaultSymbols = {
    stocks: "AAPL",
    crypto: "BTC",
    forex: "EUR/USD",
    commodities: "GOLD",
  };

  tradeSymbol.value = defaultSymbols[market] || "";
  modal.style.display = "block";

  // Add modal animation
  const modalContent = modal.querySelector(".modal-content");
  modalContent.style.transform = "scale(0.8)";
  modalContent.style.opacity = "0";

  setTimeout(() => {
    modalContent.style.transform = "scale(1)";
    modalContent.style.opacity = "1";
    modalContent.style.transition = "all 0.3s ease";
  }, 10);
}

// Expense Tracker functionality - FIXED
function initializeExpenseTracker() {
  const expenseForm = document.getElementById("expenseForm");
  const expensesList = document.getElementById("expensesList");
  const totalExpenses = document.getElementById("totalExpenses");
  const monthExpenses = document.getElementById("monthExpenses");
  const tradingFees = document.getElementById("tradingFees");

  let expenses = JSON.parse(localStorage.getItem("tradingExpenses")) || [];

  // Load existing expenses immediately
  renderExpenses();
  updateExpenseSummary();

  // Add expense form handler
  expenseForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = document.getElementById("expenseDescription").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    const category = document.getElementById("expenseCategory").value;

    if (description && amount && category) {
      const expense = {
        id: Date.now(),
        description,
        amount,
        category,
        date: new Date().toISOString().split("T")[0],
      };

      expenses.push(expense);
      localStorage.setItem("tradingExpenses", JSON.stringify(expenses));

      // Re-render expenses and update summary
      renderExpenses();
      updateExpenseSummary();
      expenseForm.reset();

      showMessage(`Expense "${description}" added successfully!`, "success");
    }
  });

  function renderExpenses() {
    if (!expensesList) return;

    expensesList.innerHTML = "";

    // Show last 10 expenses in reverse order (newest first)
    expenses
      .slice(-10)
      .reverse()
      .forEach((expense, index) => {
        const expenseElement = document.createElement("div");
        expenseElement.className = "expense-item fade-in";
        expenseElement.style.animationDelay = `${index * 0.1}s`;

        expenseElement.innerHTML = `
                <div class="expense-details">
                    <h4>${expense.description}</h4>
                    <p>${expense.category.replace("-", " ").toUpperCase()} • ${
          expense.date
        }</p>
                </div>
                <div style="display: flex; align-items: center;">
                    <span class="expense-amount">-$${expense.amount.toFixed(
                      2
                    )}</span>
                    <button class="delete-btn" onclick="deleteExpense(${
                      expense.id
                    })">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

        expensesList.appendChild(expenseElement);
      });
  }

  function updateExpenseSummary() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthTotal = expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getMonth() === currentMonth &&
          expenseDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, expense) => sum + expense.amount, 0);
    const feesTotal = expenses
      .filter((expense) => expense.category.includes("fees"))
      .reduce((sum, expense) => sum + expense.amount, 0);

    if (totalExpenses) totalExpenses.textContent = `$${total.toFixed(2)}`;
    if (monthExpenses) monthExpenses.textContent = `$${monthTotal.toFixed(2)}`;
    if (tradingFees) tradingFees.textContent = `$${feesTotal.toFixed(2)}`;
  }

  // Make deleteExpense globally available
  window.deleteExpense = function (id) {
    expenses = expenses.filter((expense) => expense.id !== id);
    localStorage.setItem("tradingExpenses", JSON.stringify(expenses));
    renderExpenses();
    updateExpenseSummary();
    showMessage("Expense deleted successfully!", "success");
  };
}

// Dashboard functionality - FIXED QUICK ACTIONS
function initializeDashboard() {
  const quickActionButtons = document.querySelectorAll(".action-btn");

  quickActionButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const action = e.currentTarget.id;

      // Add click animation
      button.style.transform = "scale(0.95)";
      setTimeout(() => {
        button.style.transform = "";
      }, 150);

      handleQuickAction(action);
    });
  });

  function handleQuickAction(action) {
    const messages = {
      buyBtn: "Buy order interface opened! Select an asset to purchase.",
      sellBtn: "Sell order interface opened! Choose positions to close.",
      analyzeBtn: "Market analysis tools activated! Advanced charts loading...",
      alertBtn:
        "Price alert system configured! Set your notification preferences.",
    };

    showMessage(messages[action] || "Action executed successfully!", "success");

    // Simulate loading with better visual feedback
    const button = document.getElementById(action);
    if (button) {
      const originalHTML = button.innerHTML;
      button.innerHTML = '<div class="loading"></div>';
      button.style.pointerEvents = "none";

      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.pointerEvents = "auto";
      }, 1500);
    }
  }

  // Update dashboard data periodically
  setInterval(updateDashboardData, 10000);
}

// Portfolio functionality - ENHANCED
function initializePortfolio() {
  const portfolioButtons = document.querySelectorAll(
    "#viewStocksBtn, #viewCryptoBtn, #viewForexBtn"
  );

  portfolioButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const portfolioType = e.target.id
        .replace("view", "")
        .replace("Btn", "")
        .toLowerCase();

      // Add click animation
      button.style.transform = "scale(0.95)";
      setTimeout(() => {
        button.style.transform = "";
      }, 150);

      showPortfolioDetails(portfolioType);
    });
  });

  function showPortfolioDetails(type) {
    const portfolioDetails = {
      stocks: {
        title: "Stock Portfolio Details",
        holdings: [
          { symbol: "AAPL", shares: 50, price: 185.23, change: "+2.1%" },
          { symbol: "MSFT", shares: 30, price: 378.45, change: "+1.8%" },
          { symbol: "GOOGL", shares: 15, price: 142.67, change: "-0.5%" },
          { symbol: "TSLA", shares: 25, price: 234.89, change: "+3.2%" },
        ],
      },
      crypto: {
        title: "Crypto Portfolio Details",
        holdings: [
          { symbol: "BTC", shares: 0.5, price: 67234.5, change: "+2.3%" },
          { symbol: "ETH", shares: 2.3, price: 3456.78, change: "+1.9%" },
          { symbol: "ADA", shares: 1000, price: 0.5234, change: "-0.9%" },
          { symbol: "DOT", shares: 150, price: 7.89, change: "+3.2%" },
        ],
      },
      forex: {
        title: "Forex Portfolio Details",
        holdings: [
          { symbol: "EUR/USD", shares: 10000, price: 1.0734, change: "-0.1%" },
          { symbol: "GBP/USD", shares: 8000, price: 1.2567, change: "+0.2%" },
          { symbol: "USD/JPY", shares: 5000, price: 149.23, change: "+0.5%" },
          { symbol: "AUD/USD", shares: 6000, price: 0.6789, change: "-0.3%" },
        ],
      },
    };

    const details = portfolioDetails[type];
    let detailsHtml = `
            <div class="portfolio-details-modal" style="
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.8); z-index: 3000; display: flex;
                align-items: center; justify-content: center; padding: 1rem;
            ">
                <div style="
                    background: linear-gradient(135deg, #1a1a1a, #000000);
                    padding: 2rem; border-radius: 15px; max-width: 600px; width: 100%;
                    border: 1px solid rgba(0, 255, 136, 0.3); max-height: 90vh; overflow-y: auto;
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                        <h2 style="color: #00ff88; margin: 0;">${details.title}</h2>
                        <button onclick="closePortfolioDetails()" style="
                            background: none; border: none; color: #fff; font-size: 24px; cursor: pointer;
                        ">&times;</button>
                    </div>
                    <div class="holdings-list">
        `;

    details.holdings.forEach((holding) => {
      const value = holding.shares * holding.price;
      const isPositive = holding.change.includes("+");
      detailsHtml += `
                <div style="
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 1rem; margin-bottom: 1rem; background: rgba(255,255,255,0.05);
                    border-radius: 8px; border: 1px solid rgba(0,255,136,0.2);
                ">
                    <div>
                        <h4 style="color: #fff; margin: 0 0 0.5rem 0;">${
                          holding.symbol
                        }</h4>
                        <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 0.9rem;">
                            ${holding.shares} ${
        type === "forex"
          ? "units"
          : type === "crypto" && holding.shares < 1
          ? "coins"
          : "shares"
      }
                        </p>
                    </div>
                    <div style="text-align: right;">
                        <div style="color: #fff; font-weight: 600; margin-bottom: 0.25rem;">
                            $${value.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                        </div>
                        <div style="color: ${
                          isPositive ? "#00ff88" : "#ff4444"
                        }; font-size: 0.9rem;">
                            ${holding.change}
                        </div>
                    </div>
                </div>
            `;
    });

    detailsHtml += `
                    </div>
                </div>
            </div>
        `;

    document.body.insertAdjacentHTML("beforeend", detailsHtml);

    // Make close function globally available
    window.closePortfolioDetails = function () {
      const modal = document.querySelector(".portfolio-details-modal");
      if (modal) {
        modal.remove();
      }
    };

    showMessage(
      `${
        type.charAt(0).toUpperCase() + type.slice(1)
      } portfolio details loaded!`,
      "success"
    );
  }
}

// Purchases tracking system
function initializePurchases() {
  let purchases = JSON.parse(localStorage.getItem("tradingPurchases")) || [];

  // Add sample purchases if none exist
  if (purchases.length === 0) {
    purchases = [
      {
        id: Date.now() - 86400000,
        symbol: "BTC",
        name: "Bitcoin",
        quantity: 0.1,
        price: 65000.0,
        date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
      },
      {
        id: Date.now() - 172800000,
        symbol: "ETH",
        name: "Ethereum",
        quantity: 1.5,
        price: 3200.0,
        date: new Date(Date.now() - 172800000).toISOString().split("T")[0],
      },
      {
        id: Date.now() - 259200000,
        symbol: "AAPL",
        name: "Apple Inc.",
        quantity: 10,
        price: 180.5,
        date: new Date(Date.now() - 259200000).toISOString().split("T")[0],
      },
    ];
    localStorage.setItem("tradingPurchases", JSON.stringify(purchases));
  }

  renderPurchases();

  function renderPurchases() {
    const purchasesList = document.getElementById("purchasesList");
    if (!purchasesList) return;

    purchasesList.innerHTML = "";

    if (purchases.length === 0) {
      purchasesList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: rgba(255,255,255,0.7);">
                    <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p>No purchases yet. Start trading to see your transactions here!</p>
                </div>
            `;
      return;
    }

    purchases
      .slice(-10)
      .reverse()
      .forEach((purchase, index) => {
        const totalValue = purchase.quantity * purchase.price;
        const purchaseElement = document.createElement("div");
        purchaseElement.className = "purchase-item";
        purchaseElement.style.animationDelay = `${index * 0.1}s`;

        purchaseElement.innerHTML = `
                <div class="purchase-info">
                    <h4>${purchase.name} (${purchase.symbol})</h4>
                    <p>${purchase.quantity} ${
          purchase.symbol === "BTC" || purchase.symbol === "ETH"
            ? "coins"
            : "shares"
        } @ $${purchase.price.toFixed(2)}</p>
                </div>
                <div class="purchase-value">
                    <div class="purchase-amount">$${totalValue.toFixed(2)}</div>
                    <div class="purchase-date">${purchase.date}</div>
                </div>
            `;

        purchasesList.appendChild(purchaseElement);
      });
  }

  // Function to add new purchase (called when buy button is clicked)
  window.addPurchase = function (symbol, name, quantity, price) {
    const purchase = {
      id: Date.now(),
      symbol,
      name,
      quantity,
      price,
      date: new Date().toISOString().split("T")[0],
    };

    purchases.push(purchase);
    localStorage.setItem("tradingPurchases", JSON.stringify(purchases));
    renderPurchases();
    showMessage(
      `Purchase of ${quantity} ${symbol} added to your portfolio!`,
      "success"
    );
  };
}

// Modal functionality
function initializeModals() {
  const tradingModal = document.getElementById("tradingModal");
  const currencyModal = document.getElementById("currencyModal");
  const closeButtons = document.querySelectorAll(".close");
  const cancelBtn = document.getElementById("cancelTrade");
  const executeBtn = document.getElementById("executeTrade");
  const buyCurrencyBtn = document.getElementById("buyCurrencyBtn");
  const addToWatchlistBtn = document.getElementById("addToWatchlistBtn");

  // Close modal handlers
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal");
      closeModal(modal);
    });
  });

  cancelBtn?.addEventListener("click", () => closeModal(tradingModal));

  // Click outside to close
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal(e.target);
    }
  });

  // Execute trade handler
  executeBtn?.addEventListener("click", executeTrade);

  // Currency modal buttons
  buyCurrencyBtn?.addEventListener("click", () => {
    const symbol = document.getElementById("currencyModalSymbol").textContent;
    const name = document.getElementById("currencyModalName").textContent;
    const price = parseFloat(
      document
        .getElementById("currencyModalPrice")
        .textContent.replace(/[$,]/g, "")
    );
    const quantity = Math.random() * 2 + 0.1; // Random quantity for demo

    addPurchase(symbol, name, quantity, price);
    showMessage("Buy order placed successfully!", "success");
    closeModal(currencyModal);
  });

  addToWatchlistBtn?.addEventListener("click", () => {
    showMessage("Added to watchlist!", "success");
  });

  function closeModal(modal) {
    if (!modal) return;

    const modalContent = modal.querySelector(".modal-content");
    modalContent.style.transform = "scale(0.8)";
    modalContent.style.opacity = "0";

    setTimeout(() => {
      modal.style.display = "none";
      modalContent.style.transform = "";
      modalContent.style.opacity = "";
      modalContent.style.transition = "";
    }, 300);
  }

  function executeTrade() {
    const symbol = document.getElementById("tradeSymbol").value;
    const quantity = parseFloat(document.getElementById("tradeQuantity").value);
    const price = parseFloat(document.getElementById("tradePrice").value);
    const orderType = document.getElementById("orderType").value;

    if (symbol && quantity && price) {
      // Add to purchases if it's a buy order
      addPurchase(symbol, symbol, quantity, price);

      showMessage(
        `${orderType.toUpperCase()} order for ${quantity} ${symbol} at $${price} executed successfully!`,
        "success"
      );
      closeModal(tradingModal);

      // Clear form
      document.getElementById("tradeSymbol").value = "";
      document.getElementById("tradeQuantity").value = "";
      document.getElementById("tradePrice").value = "";
    } else {
      showMessage("Please fill in all required fields!", "error");
    }
  }
}

// Chart initialization
function initializeCharts() {
  // Portfolio chart
  const portfolioCanvas = document.getElementById("portfolioChart");
  if (portfolioCanvas) {
    drawPortfolioChart(portfolioCanvas);
  }

  // Portfolio pie chart
  const pieCanvas = document.getElementById("portfolioPieChart");
  if (pieCanvas) {
    drawPortfolioPieChart(pieCanvas);
  }
}

function drawPortfolioChart(canvas) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Generate sample data
  const dataPoints = 50;
  const data = [];
  let value = 100;

  for (let i = 0; i < dataPoints; i++) {
    value += (Math.random() - 0.4) * 8;
    data.push(Math.max(50, Math.min(150, value)));
  }

  // Draw chart
  ctx.strokeStyle = "#00ff88";
  ctx.lineWidth = 2;
  ctx.beginPath();

  data.forEach((point, index) => {
    const x = (index / (dataPoints - 1)) * width;
    const y = height - ((point - 50) / 100) * height;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();

  // Add glow effect
  ctx.shadowColor = "#00ff88";
  ctx.shadowBlur = 10;
  ctx.stroke();
}

function drawPortfolioPieChart(canvas) {
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 20;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Portfolio data
  const portfolioData = [
    { label: "Bitcoin", value: 35, color: "#00ff88" },
    { label: "Ethereum", value: 25, color: "#00cc66" },
    { label: "Stocks", value: 20, color: "#009944" },
    { label: "Forex", value: 15, color: "#007733" },
    { label: "Others", value: 5, color: "#005522" },
  ];

  let currentAngle = -Math.PI / 2; // Start from top

  portfolioData.forEach((segment) => {
    const sliceAngle = (segment.value / 100) * 2 * Math.PI;

    // Draw slice
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = segment.color;
    ctx.fill();

    // Add border
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.stroke();

    currentAngle += sliceAngle;
  });
}

// Smooth scrolling
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Update market prices
function updateMarketPrices() {
  const priceElements = document.querySelectorAll(".trading-section .price");
  const changeElements = document.querySelectorAll(".trading-section .change");

  priceElements.forEach((element) => {
    const currentPrice = parseFloat(element.textContent.replace(/[$,]/g, ""));
    const change = (Math.random() - 0.5) * 0.1;
    const newPrice = currentPrice * (1 + change);

    element.textContent = `$${newPrice.toFixed(2)}`;

    // Add price flash animation
    element.style.background =
      change > 0 ? "rgba(0, 255, 136, 0.3)" : "rgba(255, 68, 68, 0.3)";
    setTimeout(() => {
      element.style.background = "";
    }, 500);
  });

  changeElements.forEach((element) => {
    const change = (Math.random() - 0.5) * 5;
    const isPositive = change > 0;

    element.textContent = `${isPositive ? "+" : ""}${change.toFixed(2)}%`;
    element.className = `change ${isPositive ? "positive" : "negative"}`;
  });
}

// Update dashboard data
function updateDashboardData() {
  // Update portfolio value
  const portfolioValue = document.querySelector(".value");
  if (portfolioValue) {
    const currentValue = parseFloat(
      portfolioValue.textContent.replace(/[$,]/g, "")
    );
    const change = (Math.random() - 0.5) * 0.02;
    const newValue = currentValue * (1 + change);
    portfolioValue.textContent = `$${newValue.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  // Update P&L values
  const pnlElements = document.querySelectorAll(".pnl");
  pnlElements.forEach((element) => {
    const currentValue = parseFloat(element.textContent.replace(/[$,+-]/g, ""));
    const change = (Math.random() - 0.5) * 0.1;
    const newValue = currentValue * (1 + change);
    const isPositive = newValue > 0;

    element.textContent = `${isPositive ? "+" : ""}$${Math.abs(
      newValue
    ).toFixed(2)}`;
    element.className = `pnl ${isPositive ? "positive" : "negative"}`;
  });

  // Redraw charts
  initializeCharts();
}

// Show message function
function showMessage(text, type = "success") {
  // Remove existing messages
  const existingMessages = document.querySelectorAll(".message");
  existingMessages.forEach((msg) => msg.remove());

  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  message.style.position = "fixed";
  message.style.top = "100px";
  message.style.right = "20px";
  message.style.zIndex = "9999";
  message.style.maxWidth = "300px";
  message.style.animation = "slideInRight 0.3s ease";

  document.body.appendChild(message);

  setTimeout(() => {
    message.style.animation = "slideInRight 0.3s ease reverse";
    setTimeout(() => {
      message.remove();
    }, 300);
  }, 3000);
}

// Add CSS for message animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(style);

// Add sample expenses on first load - UPDATED
if (!localStorage.getItem("tradingExpenses")) {
  const sampleExpenses = [
    {
      id: Date.now() - 86400000,
      description: "Platform Monthly Fee",
      amount: 29.99,
      category: "platform-fees",
      date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
    },
    {
      id: Date.now() - 172800000,
      description: "Stock Trading Commission",
      amount: 9.99,
      category: "trading-fees",
      date: new Date(Date.now() - 172800000).toISOString().split("T")[0],
    },
    {
      id: Date.now() - 259200000,
      description: "Real-time Data Feed",
      amount: 15.0,
      category: "data-feeds",
      date: new Date(Date.now() - 259200000).toISOString().split("T")[0],
    },
    {
      id: Date.now() - 345600000,
      description: "Crypto Exchange Fee",
      amount: 5.5,
      category: "trading-fees",
      date: new Date(Date.now() - 345600000).toISOString().split("T")[0],
    },
    {
      id: Date.now() - 432000000,
      description: "Market Analysis Tool",
      amount: 19.99,
      category: "software",
      date: new Date(Date.now() - 432000000).toISOString().split("T")[0],
    },
  ];

  localStorage.setItem("tradingExpenses", JSON.stringify(sampleExpenses));
}

// Performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
