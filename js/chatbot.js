/* ================================================
   TECHY BOX — Rule-Based Product Chatbot
   ================================================ */

/* ---- Styles ---- */
const CHATBOT_CSS = `
  .chatbot-bubble {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 2000;
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #3B82F6, #1D4ED8);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(59,130,246,0.5), 0 0 0 0 rgba(59,130,246,0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    animation: bubblePulse 3s ease-in-out infinite;
    color: #fff;
  }
  .chatbot-bubble:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 28px rgba(59,130,246,0.7);
  }
  .chatbot-bubble.open { animation: none; transform: scale(1.05); }
  .chatbot-unread {
    position: absolute;
    top: -4px; right: -4px;
    width: 18px; height: 18px;
    background: #EF4444;
    border-radius: 50%;
    border: 2px solid #050D1B;
    font-size: 0.65rem;
    font-weight: 700;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    display: none;
  }
  .chatbot-unread.show { display: flex; }

  .chatbot-window {
    position: fixed;
    bottom: 100px;
    right: 28px;
    width: 360px;
    height: 520px;
    z-index: 1999;
    background: #091428;
    border: 1px solid rgba(59,130,246,0.25);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.1);
    transform: scale(0.85) translateY(20px);
    transform-origin: bottom right;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }
  .chatbot-window.open {
    transform: scale(1) translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .chatbot-header {
    padding: 14px 16px;
    background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(29,78,216,0.1));
    border-bottom: 1px solid rgba(59,130,246,0.2);
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }
  .chatbot-avatar {
    width: 38px; height: 38px;
    background: linear-gradient(135deg, #3B82F6, #1D4ED8);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    flex-shrink: 0;
    box-shadow: 0 0 12px rgba(59,130,246,0.4);
  }
  .chatbot-header-info { flex: 1 }
  .chatbot-name { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.9rem; color: #F0F4FF; }
  .chatbot-status { font-size: 0.72rem; color: #10B981; display: flex; align-items: center; gap: 5px; }
  .chatbot-status-dot { width: 6px; height: 6px; background: #10B981; border-radius: 50%; animation: pulse 2s infinite; }
  .chatbot-close-btn {
    width: 28px; height: 28px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #8892B0;
    transition: all 0.15s ease;
    font-size: 16px; line-height: 1;
  }
  .chatbot-close-btn:hover { color: #F0F4FF; border-color: rgba(59,130,246,0.3); }

  .chatbot-messages {
    flex: 1;
    overflow-y: auto;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    scroll-behavior: smooth;
  }
  .chatbot-messages::-webkit-scrollbar { width: 4px; }
  .chatbot-messages::-webkit-scrollbar-track { background: transparent; }
  .chatbot-messages::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 4px; }

  .chat-msg {
    display: flex;
    gap: 8px;
    align-items: flex-end;
    animation: fadeInUp 0.25s ease;
  }
  .chat-msg.user { flex-direction: row-reverse; }

  .msg-avatar {
    width: 26px; height: 26px;
    background: linear-gradient(135deg, #3B82F6, #1D4ED8);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.7rem; color: #fff; flex-shrink: 0;
  }
  .msg-avatar.user-av {
    background: rgba(59,130,246,0.2);
    border: 1px solid rgba(59,130,246,0.3);
    color: #3B82F6;
  }

  .msg-bubble {
    max-width: 72%;
    padding: 10px 13px;
    border-radius: 16px;
    font-size: 0.84rem;
    line-height: 1.55;
    color: #F0F4FF;
  }
  .chat-msg.bot .msg-bubble {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    border-bottom-left-radius: 4px;
  }
  .chat-msg.user .msg-bubble {
    background: linear-gradient(135deg, #3B82F6, #1D4ED8);
    border-bottom-right-radius: 4px;
  }

  .typing-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 10px 13px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    border-bottom-left-radius: 4px;
    width: fit-content;
  }
  .typing-dot {
    width: 7px; height: 7px;
    background: #3B82F6;
    border-radius: 50%;
    animation: typingDot 1.2s ease infinite;
  }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }

  .chat-quick-btns {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 4px;
  }
  .quick-btn {
    padding: 5px 12px;
    background: rgba(59,130,246,0.1);
    border: 1px solid rgba(59,130,246,0.25);
    border-radius: 20px;
    font-size: 0.78rem;
    color: #60A5FA;
    cursor: pointer;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 500;
    transition: all 0.15s ease;
    white-space: nowrap;
  }
  .quick-btn:hover {
    background: rgba(59,130,246,0.2);
    border-color: rgba(59,130,246,0.4);
    color: #F0F4FF;
  }

  .chatbot-input-area {
    padding: 12px 14px;
    border-top: 1px solid rgba(59,130,246,0.15);
    display: flex;
    gap: 8px;
    align-items: center;
    flex-shrink: 0;
  }
  .chatbot-input {
    flex: 1;
    padding: 9px 14px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    color: #F0F4FF;
    font-size: 0.85rem;
    font-family: 'Inter', sans-serif;
    outline: none;
    transition: border-color 0.2s ease;
  }
  .chatbot-input::placeholder { color: #4A5568; }
  .chatbot-input:focus { border-color: rgba(59,130,246,0.4); background: rgba(59,130,246,0.05); }
  .chatbot-send-btn {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, #3B82F6, #1D4ED8);
    border: none; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #fff;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(59,130,246,0.35);
  }
  .chatbot-send-btn:hover { transform: scale(1.08); box-shadow: 0 4px 14px rgba(59,130,246,0.5); }
  .chatbot-send-btn:active { transform: scale(0.95); }

  @keyframes bubblePulse {
    0%,100%{ box-shadow:0 4px 20px rgba(59,130,246,0.5),0 0 0 0 rgba(59,130,246,0.3) }
    50%{ box-shadow:0 4px 20px rgba(59,130,246,0.5),0 0 0 10px rgba(59,130,246,0) }
  }
  @keyframes typingDot {
    0%,80%,100%{ transform:scale(0.6);opacity:0.4 }
    40%{ transform:scale(1);opacity:1 }
  }
  @keyframes fadeInUp {
    from{ opacity:0;transform:translateY(8px) }
    to{ opacity:1;transform:translateY(0) }
  }
  @keyframes pulse {
    0%,100%{opacity:1} 50%{opacity:0.5}
  }
  @media(max-width:480px){
    .chatbot-window{ width:calc(100vw - 24px);right:12px;bottom:90px }
    .chatbot-bubble{ bottom:18px;right:18px }
  }
`;

/* ============================================================
   CHATBOT KNOWLEDGE BASE
   ============================================================ */
const INTENT_MAP = [
  /* ---- Greetings ---- */
  {
    patterns: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'kumusta', 'kamusta', 'musta'],
    response: `Hello! 👋 Welcome to **Techy Box**! I'm TechBot, your IoT assistant.\n\nHow can I help you today?`,
    quick: ['Product prices 💰', 'How to order 🛒', 'Services 🔧', 'Shipping info 📦']
  },

  /* ---- Products - General ---- */
  {
    patterns: ['product', 'products', 'what do you sell', 'items', 'catalog', 'available', 'stock'],
    response: `We carry **31 IoT components** across 7 categories:\n\n⚡ **Microcontrollers** — ESP32 (₱350), Arduino Kit (₱664), Arduino Set (₱487)\n🔌 **Relay Modules** — 5V & 24V relays (₱149–₱229)\n📡 **Sensors** — MQ2 Smoke (₱169), RFID Kit (₱148)\n🖥️ **Displays** — OLED Display (₱245)\n🔋 **Power** — 12V PSU 5A (₱310), 10A (₱463)\n🔧 **Accessories** — Breadboards, Jumper Wires, Servo, more\n🔊 **Components** — Buzzer (₱150), Buttons (₱145)\n\nVisit our [Products Page](products.html) to see everything!`,
    quick: ['ESP32 price', 'Arduino price', 'Relay modules', 'How to order']
  },

  /* ---- ESP32 ---- */
  {
    patterns: ['esp32', 'esp 32', 'esp-32'],
    response: `**ESP32** — ₱350 🔥\n\nA powerful dual-core MCU with built-in WiFi & Bluetooth 4.2. Perfect for IoT projects, automation, and smart devices.\n\n📋 **Specs:**\n• Dual-core 240MHz processor\n• WiFi + Bluetooth 4.2\n• 4MB Flash, 520KB SRAM\n• 38 GPIO pins\n\nOne of our best sellers! `,
    quick: ['Add ESP32 to cart', 'Arduino price', 'View all products']
  },
  {
    patterns: ['add esp32', 'buy esp32', 'order esp32'],
    response: `Great choice! You can add the **ESP32 (₱350)** to your cart directly from our [Products Page](products.html). \n\nJust click the **+ button** on the ESP32 card! 🛒`,
    quick: ['Go to products', 'How to order', 'Payment methods']
  },

  /* ---- Arduino ---- */
  {
    patterns: ['arduino kit', 'arduino starter'],
    response: `**Arduino Kit** — ₱664\n\nComplete starter kit with Arduino Uno board and essential components. Perfect for beginners!\n\n📋 **Specs:**\n• ATmega328P microcontroller\n• 14 Digital I/O pins\n• 6 Analog inputs\n• USB-B interface\n• Includes components`,
    quick: ['Arduino Set price', 'ESP32 vs Arduino', 'View products']
  },
  {
    patterns: ['arduino set'],
    response: `**Arduino Set** — ₱487\n\nArduino board with a curated set of components for your projects. More budget-friendly than the full Kit!\n\n📋 **Includes:**\n• Arduino Uno R3\n• USB Cable\n• Breadboard\n• Jumper Wires`,
    quick: ['Arduino Kit price', 'View products', 'How to order']
  },
  {
    patterns: ['arduino'],
    response: `We carry **two Arduino options**:\n\n🤖 **Arduino Kit** — ₱664 (complete starter bundle)\n🤖 **Arduino Set** — ₱487 (board + select components)\n\nBoth include Arduino Uno R3. The Kit has more components for beginners!`,
    quick: ['Arduino Kit details', 'Arduino Set details', 'ESP32 alternative']
  },

  /* ---- Relay Modules ---- */
  {
    patterns: ['relay', 'relay module', 'relay modules'],
    response: `We carry **7 relay modules** — both 24V and 5V:\n\n**24V Relays:**\n⚡ 1 Channel — ₱159\n⚡ 2 Channel — ₱179\n⚡ 3 Channel — ₱229\n\n**5V Relays:**\n⚡ 1 Channel — ₱149\n⚡ 2 Channel — ₱162\n⚡ 4 Channel — ₱200\n\nAll relay modules are optocoupler-isolated and have LED indicators.`,
    quick: ['5V relay', '24V relay', 'View products', 'Which relay do I need?']
  },
  {
    patterns: ['5v relay', '5 volt relay'],
    response: `**5V Relay Modules:**\n\n⚡ 1 Channel — ₱149\n⚡ 2 Channel — ₱162\n⚡ 4 Channel — ₱200\n\nAll 5V relays are compatible with **Arduino and ESP32** (active low trigger). Great for home automation!`,
    quick: ['24V relay', 'View all relays', 'How to order']
  },
  {
    patterns: ['24v relay', '24 volt relay'],
    response: `**24V Relay Modules:**\n\n⚡ 1 Channel — ₱159\n⚡ 2 Channel — ₱179\n⚡ 3 Channel — ₱229\n\nUsed for controlling **industrial equipment and higher-voltage systems** (up to 250VAC / 10A). Perfect for automation projects!`,
    quick: ['5V relay', 'View all relays', 'How to order']
  },

  /* ---- Power Supply ---- */
  {
    patterns: ['power supply', '12v', 'psu', 'power', '12 volt'],
    response: `**Power Supplies:**\n\n🔋 **12V Power Supply 10A** — ₱463 (120W, for demanding projects)\n🔋 **12V Power Supply 5A** — ₱310 (60W, for most projects)\n\nBoth accept **AC 100–240V input** and include short circuit + overvoltage protection. Excellent for LED strips, motors, and relay systems.`,
    quick: ['12V 10A details', '12V 5A details', 'View all products']
  },

  /* ---- Sensors ---- */
  {
    patterns: ['sensor', 'smoke sensor', 'mq2', 'gas sensor'],
    response: `**MQ2 Smoke Sensor** — ₱169\n\nDetects smoke, LPG, propane, hydrogen, and alcohol. Has both **analog and digital outputs**.\n\n📋 **Specs:**\n• 5V operation\n• Fast response time\n• High sensitivity\n• Perfect for fire alarms and gas detection`,
    quick: ['RFID sensor', 'View all sensors', 'How to order']
  },
  {
    patterns: ['rfid', 'rc522', 'rc552', 'rfid kit'],
    response: `**RC552 RFID Kit** — ₱148\n\n📡 Complete RFID reader/writer kit with:\n• RC522 module (13.56MHz)\n• SPI interface\n• Includes RFID card + key fob\n• Arduino and ESP32 compatible\n\nPerfect for **access control and attendance systems**!`,
    quick: ['Smoke sensor', 'View all sensors', 'How to order']
  },

  /* ---- Display ---- */
  {
    patterns: ['oled', 'display', 'screen', 'oled display'],
    response: `**OLED Display** — ₱245\n\n🖥️ Crisp 128×64 OLED with I2C interface.\n\n📋 **Specs:**\n• 128×64 resolution\n• 0.96 inch screen\n• I2C interface\n• SSD1306 driver\n• Works with Arduino & ESP32`,
    quick: ['View all products', 'How to order', 'ESP32 compatible?']
  },

  /* ---- Accessories ---- */
  {
    patterns: ['breadboard'],
    response: `**Breadboards:**\n\n🔧 **Breadboard Standard** — ₱147 (830 tie points, full size)\n🔧 **Breadboard Mini** — ₱115 (170 tie points, compact)\n\nBoth are solderless and great for prototyping!`,
    quick: ['Jumper wires', 'View accessories', 'How to order']
  },
  {
    patterns: ['jumper wire', 'jumper wires', 'jumper', 'wire', 'wires'],
    response: `**Jumper Wires:**\n\n🔗 **M-F 30cm** — ₱144 (Male to Female, 40pcs)\n🔗 **M-M 30cm** — ₱144 (Male to Male, 40pcs)\n🔗 **M-F 20cm** — ₱135 (Male to Female, 40pcs)\n\nAll are 26AWG, perfect for breadboard and sensor connections!`,
    quick: ['Breadboard price', 'View accessories', 'How to order']
  },
  {
    patterns: ['servo', 'servo 360', 'servo motor'],
    response: `**Servo 360°** — ₱166\n\n⚙️ Continuous rotation servo motor — ideal for robotics, conveyor systems, and creative projects. Arduino compatible, 5V operation.`,
    quick: ['View accessories', 'How to order']
  },
  {
    patterns: ['buzzer'],
    response: `**Buzzer** — ₱150\n\n🔊 Active piezo buzzer, 5V DC, ~85dB output. Perfect for alarms, notifications, and audio feedback in your projects.`,
    quick: ['Buttons price', 'View components']
  },
  {
    patterns: ['button', 'buttons', 'push button'],
    response: `**Buttons** — ₱145\n\n🔘 Pack of 10 tactile push buttons (12×12mm, through-hole). Essential for adding user input to any circuit.`,
    quick: ['Buzzer price', 'View components']
  },
  {
    patterns: ['usb', 'micro usb', 'cable', 'micro-usb'],
    response: `**Micro-USB Cable** — ₱91\n\n🔌 1-meter braided nylon Micro-USB cable for powering Arduino, programming, and data transfer. Durable and reliable.`,
    quick: ['View accessories', 'How to order']
  },

  /* ---- Ordering ---- */
  {
    patterns: ['how to order', 'order', 'buy', 'purchase', 'how do i buy', 'paano mag order'],
    response: `**How to Order:**\n\n1️⃣ Browse our [Products Page](products.html)\n2️⃣ Click the **+ button** to add items to your cart\n3️⃣ Open the cart and choose your checkout option:\n   • 💳 **Online Checkout** (GCash, card)\n   • 📧 **Email Inquiry** (we'll send details)\n4️⃣ We'll confirm your order and arrange delivery!`,
    quick: ['Payment methods', 'Shipping info', 'Do you COD?']
  },

  /* ---- Payment ---- */
  {
    patterns: ['payment', 'how to pay', 'gcash', 'maya', 'bank transfer', 'payment method', 'bayad'],
    response: `**Payment Methods:**\n\n💚 **GCash**\n💙 **Maya (PayMaya)**\n🏦 **Bank Transfer** — BDO, BPI, Metrobank\n💵 **Cash** (local pickup)\n💳 **Credit/Debit Card** (via online checkout)\n\nPayment details will be sent after order confirmation!`,
    quick: ['How to order', 'Shipping info', 'Do you COD?']
  },
  {
    patterns: ['cod', 'cash on delivery', 'bayad sa delivery'],
    response: `Currently, we **do not offer COD** for most orders. However, for local clients, cash payment upon pickup may be arranged.\n\nWe accept GCash, Maya, bank transfer, and card payments. 😊`,
    quick: ['Payment methods', 'How to order', 'Shipping info']
  },

  /* ---- Shipping ---- */
  {
    patterns: ['ship', 'shipping', 'delivery', 'padala', 'how long', 'how many days', 'magkano ang shipping'],
    response: `**Shipping Info:**\n\n📦 We ship nationwide via **J&T Express, LBC, or Grab/Lalamove** (for local).\n\n⏱️ **Delivery time:**\n• Metro Manila: 1–3 days\n• Provincial: 3–7 days\n\n💰 **Shipping fees** are calculated at checkout based on your location and order weight.\n\nOrders are processed within **24 hours** on business days!`,
    quick: ['How to order', 'Payment methods', 'Do you have pickup?']
  },
  {
    patterns: ['pickup', 'pick up', 'store', 'office'],
    response: `Yes, **local pickup** is available! 📍 Contact us first to schedule a time and confirm availability. Message us on Facebook or email us to arrange pickup.`,
    quick: ['Contact info', 'How to order', 'Shipping info']
  },

  /* ---- Services ---- */
  {
    patterns: ['service', 'services', 'web development', 'iot development', 'develop', 'build', 'website', 'system'],
    response: `We offer **two professional services:**\n\n🌐 **Web Development** — Starting at ₱7,000\n• Landing pages, company websites\n• E-commerce stores\n• Web apps & dashboards\n\n📡 **IoT Development** — Starting at ₱10,000\n• Custom smart device development\n• Firmware & hardware design\n• IoT dashboards & remote monitoring\n\nVisit our [Services Page](services.html) for full pricing!`,
    quick: ['Web dev pricing', 'IoT dev pricing', 'Get a quote']
  },
  {
    patterns: ['web dev', 'web development price', 'website price', 'magkano website'],
    response: `**Web Development Pricing:**\n\n🌐 Landing Page: ₱7,000–₱15,000\n🌐 Company Website: ₱12,000–₱30,000\n🌐 E-Commerce: ₱22,000–₱60,000\n🌐 Web App/Dashboard: ₱30,000–₱90,000+\n\nPrices depend on features and complexity. Get a [free quote](services.html#quote)!`,
    quick: ['IoT dev pricing', 'Get a quote', 'Process']
  },
  {
    patterns: ['iot dev', 'iot development price', 'automation price', 'smart home price'],
    response: `**IoT Development Pricing:**\n\n📡 Custom IoT Device: ₱10,000–₱50,000+\n\nIncludes prototype development, firmware programming, enclosure design, and documentation.\n\nComponent costs may be separate. Get a [free quote](services.html#quote)!`,
    quick: ['Web dev pricing', 'Get a quote', 'Services page']
  },
  {
    patterns: ['quote', 'free quote', 'get quote', 'consultation'],
    response: `To get a **free quote**, fill out our quote form on the [Services Page](services.html#quote)!\n\nWe'll respond within **24 hours** with a detailed proposal. No commitment required. 😊`,
    quick: ['Services page', 'Contact info', 'Web dev pricing']
  },

  /* ---- Contact ---- */
  {
    patterns: ['contact', 'email', 'facebook', 'message', 'reach', 'how to contact', 'contact info'],
    response: `**Contact Techy Box:**\n\n📧 Email: techybox26@gmail.com\n📱 Facebook: facebook.com/techybox\n📞 Phone: +63 9XX XXX XXXX\n🕐 Hours: Mon–Sat, 9AM–6PM\n\nFastest response is usually via **Facebook Messenger**!`,
    quick: ['How to order', 'Services', 'Shipping info']
  },

  /* ---- Compatibility ---- */
  {
    patterns: ['compatible', 'arduino compatible', 'esp32 compatible', 'works with'],
    response: `Most of our products are compatible with both **Arduino and ESP32**:\n\n✅ Sensors (MQ2, RFID)\n✅ OLED Display (I2C)\n✅ 5V Relay Modules\n✅ Breadboards & Jumper Wires\n✅ Servo 360°\n✅ Buzzer & Buttons\n\n⚠️ 24V Relays need a separate 24V power supply but can be triggered by 5V signal.`,
    quick: ['ESP32 price', 'Arduino price', 'View products']
  },

  /* ---- Price check ---- */
  {
    patterns: ['price', 'prices', 'how much', 'magkano', 'cost', 'cheap', 'affordable'],
    response: `Here are our most popular prices:\n\n• ESP32 — ₱350\n• Arduino Kit — ₱664\n• OLED Display — ₱245\n• MQ2 Sensor — ₱169\n• 5V Relay (1ch) — ₱149\n• 12V PSU 10A — ₱463\n• Micro-USB Cable — ₱91\n\nSee all 31 products on our [Products Page](products.html)!`,
    quick: ['How to order', 'Cheapest products', 'Most popular']
  },
  {
    patterns: ['cheapest', 'cheap', 'lowest price', 'pinaka mura'],
    response: `Our **most affordable products:**\n\n💰 Micro-USB Cable — ₱91\n💰 Breadboard Mini — ₱115\n💰 M-F Jumper Wire 20cm — ₱135\n💰 Buttons — ₱145\n💰 5V Relay (1ch) — ₱149\n💰 RC552 RFID Kit — ₱148\n\nAll great for budget projects! 😊`,
    quick: ['How to order', 'View all products', 'Most popular']
  },
  {
    patterns: ['popular', 'best seller', 'bestseller', 'most popular', 'top product'],
    response: `Our **top-selling products:**\n\n🔥 ESP32 — ₱350 (IoT projects)\n🔥 Arduino Kit — ₱664 (beginners)\n🔥 OLED Display — ₱245 (display output)\n🔥 MQ2 Smoke Sensor — ₱169 (safety systems)\n🔥 5V Relay Modules — ₱149+ (home automation)\n\nAll in stock and ready to ship!`,
    quick: ['How to order', 'View products', 'Shipping info']
  },

  /* ---- Thanks ---- */
  {
    patterns: ['thank', 'thanks', 'salamat', 'thank you', 'ty'],
    response: `You're welcome! 😊 Happy to help. Is there anything else you'd like to know about our products or services?\n\nFeel free to ask anytime! 🚀`,
    quick: ['View products 📦', 'Services 🔧', 'Contact us 📱']
  },

  /* ---- Bye ---- */
  {
    patterns: ['bye', 'goodbye', 'see you', 'paalam'],
    response: `Goodbye! Thanks for visiting **Techy Box**! 👋\n\nDon't hesitate to come back if you have more questions. Happy building! ⚡🔌`,
    quick: []
  },
];

const FALLBACK_RESPONSES = [
  `I'm not sure about that, but I can help you with:\n\n• **Product prices & availability**\n• **How to order**\n• **Shipping & payment info**\n• **Our web & IoT services**\n\nTry asking something like "ESP32 price" or "how to order"!`,
  `Hmm, I didn't quite catch that! 🤔 Try asking about a specific product, pricing, shipping, or our services. You can also visit our [Products Page](products.html) or [Services Page](services.html)!`,
  `I'm still learning! 😅 For detailed questions, you can reach us at **techybox26@gmail.com** or message us on Facebook. I can help with product prices, ordering, and shipping though!`,
];
let fallbackIdx = 0;

/* ============================================================
   CHATBOT ENGINE
   ============================================================ */
let chatHistory = [];
let isOpen = false;
let unreadCount = 0;

function matchIntent(input) {
  const lower = input.toLowerCase().trim();
  for (const intent of INTENT_MAP) {
    if (intent.patterns.some(p => lower.includes(p))) {
      return intent;
    }
  }
  return null;
}

function getBotResponse(userMsg) {
  const intent = matchIntent(userMsg);
  if (intent) {
    return { text: intent.response, quick: intent.quick || [] };
  }
  const resp = FALLBACK_RESPONSES[fallbackIdx % FALLBACK_RESPONSES.length];
  fallbackIdx++;
  return { text: resp, quick: ['Product prices 💰', 'How to order 🛒', 'Contact us 📱'] };
}

/* ============================================================
   CHATBOT UI
   ============================================================ */
function renderMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#60A5FA;text-decoration:underline">$1</a>')
    .replace(/\n/g, '<br>');
}

function addMessage(role, text, quick = []) {
  const msgs = document.getElementById('tb-chat-messages');
  if (!msgs) return;

  const wrap = document.createElement('div');
  wrap.className = `chat-msg ${role}`;

  const avatarIcon = role === 'bot'
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="2" height="2"/><rect x="13" y="9" width="2" height="2"/><path d="M9 14s1 1 3 1 3-1 3-1"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;

  const quickHTML = quick.length
    ? `<div class="chat-quick-btns">${quick.map(q => `<button class="quick-btn" onclick="handleQuickBtn('${q.replace(/'/g, "\\'")}')">${q}</button>`).join('')}</div>`
    : '';

  wrap.innerHTML = `
    <div class="msg-avatar ${role === 'user' ? 'user-av' : ''}">${avatarIcon}</div>
    <div>
      <div class="msg-bubble">${renderMarkdown(text)}</div>
      ${quickHTML}
    </div>
  `;
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById('tb-chat-messages');
  if (!msgs) return null;
  const el = document.createElement('div');
  el.className = 'chat-msg bot';
  el.id = 'tb-typing';
  el.innerHTML = `
    <div class="msg-avatar">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="2" height="2"/><rect x="13" y="9" width="2" height="2"/><path d="M9 14s1 1 3 1 3-1 3-1"/></svg>
    </div>
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>`;
  msgs.appendChild(el);
  msgs.scrollTop = msgs.scrollHeight;
  return el;
}

function sendMessage(text) {
  if (!text.trim()) return;
  addMessage('user', text);

  const typing = showTyping();
  const delay = 600 + Math.random() * 500;

  setTimeout(() => {
    typing?.remove();
    const { text: resp, quick } = getBotResponse(text);
    addMessage('bot', resp, quick);
    if (!isOpen) {
      unreadCount++;
      const badge = document.querySelector('.chatbot-unread');
      if (badge) { badge.textContent = unreadCount; badge.classList.add('show'); }
    }
  }, delay);
}

function handleQuickBtn(text) {
  sendMessage(text.replace(/[^\w\s₱.,-]/g, '').trim() || text);
}

function toggleChat() {
  isOpen = !isOpen;
  const win = document.getElementById('tb-chat-window');
  const bubble = document.getElementById('tb-chat-bubble');
  const badge = document.querySelector('.chatbot-unread');
  win?.classList.toggle('open', isOpen);
  bubble?.classList.toggle('open', isOpen);
  if (isOpen) {
    unreadCount = 0;
    if (badge) badge.classList.remove('show');
    const input = document.getElementById('tb-chat-input');
    setTimeout(() => input?.focus(), 300);
  }
}

/* ============================================================
   INIT
   ============================================================ */
function initChatbot() {
  /* Inject styles */
  const style = document.createElement('style');
  style.textContent = CHATBOT_CSS;
  document.head.appendChild(style);

  /* Build HTML */
  const html = `
    <button class="chatbot-bubble" id="tb-chat-bubble" aria-label="Open TechBot chat" onclick="toggleChat()">
      <svg xmlns="http://www.w3.org/2000/svg" id="tb-bubble-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <span class="chatbot-unread">1</span>
    </button>

    <div class="chatbot-window" id="tb-chat-window" role="dialog" aria-label="TechBot Assistant">
      <div class="chatbot-header">
        <div class="chatbot-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="2" height="2"/><rect x="13" y="9" width="2" height="2"/><path d="M9 14s1 1 3 1 3-1 3-1"/></svg>
        </div>
        <div class="chatbot-header-info">
          <div class="chatbot-name">TechBot</div>
          <div class="chatbot-status"><span class="chatbot-status-dot"></span> Online — Always here to help</div>
        </div>
        <button class="chatbot-close-btn" onclick="toggleChat()" aria-label="Close chat">✕</button>
      </div>

      <div class="chatbot-messages" id="tb-chat-messages"></div>

      <div class="chatbot-input-area">
        <input
          type="text"
          class="chatbot-input"
          id="tb-chat-input"
          placeholder="Ask about products, prices, shipping..."
          autocomplete="off"
          maxlength="200"
        >
        <button class="chatbot-send-btn" id="tb-send-btn" aria-label="Send message">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);

  /* Events */
  const input = document.getElementById('tb-chat-input');
  const sendBtn = document.getElementById('tb-send-btn');

  function doSend() {
    const val = input.value.trim();
    if (!val) return;
    input.value = '';
    sendMessage(val);
  }

  sendBtn?.addEventListener('click', doSend);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doSend(); } });

  /* Welcome message after 1.2s */
  setTimeout(() => {
    addMessage('bot',
      `👋 Hi! I'm **TechBot**, Techy Box's virtual assistant!\n\nAsk me about our IoT products, prices, how to order, shipping, or our development services. What can I help you with?`,
      ['Product prices 💰', 'How to order 🛒', 'Services 🔧', 'Shipping info 📦']
    );
    /* Show unread badge after 2.5s if chat not open */
    setTimeout(() => {
      if (!isOpen) {
        unreadCount = 1;
        const badge = document.querySelector('.chatbot-unread');
        if (badge) { badge.textContent = 1; badge.classList.add('show'); }
      }
    }, 1300);
  }, 1200);
}

/* Auto-init when DOM ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  initChatbot();
}
