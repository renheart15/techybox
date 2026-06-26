/* ================================================
   TECHY BOX — Products, Cart & Add-to-Cart Modal
   ================================================ */

/* ============================================================
   PRODUCT GROUPS  (31 display groups, 46 variants)
   ============================================================ */
const PRODUCT_GROUPS = [
  {
    groupId:'esp32', name:'ESP32', category:'Microcontrollers', icon:'cpu', featured:true,
    image:'assets/images/products/ESP32.jpg',
    desc:'Powerful microcontroller board with built-in WiFi and Bluetooth, standard in IoT development.',
    variants:[
      { id:1, label:'Standard', cartName:'Esp32', price:350, specs:['Dual-core 240MHz','WiFi + Bluetooth','38 GPIO Pins'] },
      { id:2, label:'Kit', cartName:'Esp32 Kit', price:433, specs:['ESP32 Board','Storage Box Included','Heatsink Included'] }
    ]
  },
  {
    groupId:'hx711', name:'HX711 Load Cell', category:'Sensors', icon:'activity', featured:false,
    image:'assets/images/products/HX711 Load Cell.jpg',
    desc:'High-precision 24-bit analog-to-digital converter designed for weigh scales and industrial control.',
    variants:[
      { id:3, label:'Standard', cartName:'HX711 Load Cell', price:313, specs:['24-bit ADC','Low Noise PGA','On-chip Oscillator'] }
    ]
  },
  {
    groupId:'lcd', name:'LCD 1602 I2C', category:'Displays', icon:'monitor', featured:false,
    image:'assets/images/products/LCD.jpg',
    desc:'16x2 Character LCD display module with pre-soldered I2C backpack interface for simplified wiring.',
    variants:[
      { id:4, label:'1602 I2C', cartName:'LCD 1602 I2C', price:263, specs:['16x2 Characters','I2C Backpack','Blue Backlight','5V Operation'] }
    ]
  },
  {
    groupId:'hc05', name:'HC05 Bluetooth Module', category:'Sensors', icon:'wifi', featured:false,
    image:'assets/images/products/HC05.jpg',
    desc:'HC-05 serial Bluetooth module designed for transparent wireless serial communication with microcontrollers.',
    variants:[
      { id:5, label:'Standard', cartName:'HC05 Bluetooth Module', price:352, specs:['Bluetooth V2.0+EDR','Serial Interface','3.3V-5V Operation'] }
    ]
  },
  {
    groupId:'step-down', name:'Step Down Buck Converter', category:'Power', icon:'zap', featured:false,
    image:'assets/images/products/Step Down.jpg',
    desc:'Adjustable step-down voltage regulator module. High efficiency power conversion for projects.',
    variants:[
      { id:6, label:'Standard', cartName:'Step Down Buck Converter', price:173, specs:['Input 4.5V-28V','Output 0.8V-20V','Max 3A','High Efficiency'] }
    ]
  },
  {
    groupId:'usb-ttl', name:'USB to TTL Converter', category:'Accessories', icon:'usb', featured:false,
    image:'assets/images/products/CP2102 USB to TTL.jpg',
    desc:'CP2102 USB to TTL UART serial converter for programming microcontrollers and debug serial output.',
    variants:[
      { id:7, label:'Standard', cartName:'CP2102 USB to TTL', price:153, specs:['CP2102 Chip','USB 2.0 to UART','5V & 3.3V Outputs','LED Indicators'] }
    ]
  },
  {
    groupId:'pump', name:'Submersible Water Pump', category:'Components', icon:'droplet', featured:false,
    image:'assets/images/products/Pump.jpg',
    desc:'Mini submersible water pump. Silent and compact for automatic plant watering systems.',
    variants:[
      { id:8, label:'Standard', cartName:'Submersible Pump', price:152, specs:['Submersible Design','5V-12V Operation','Waterproof','Low Noise'] }
    ]
  },
  {
    groupId:'heat-shrink', name:'Heat Shrink Tubes', category:'Accessories', icon:'layers', featured:false,
    image:'assets/images/products/Heat Shrink Tubes.jpg',
    desc:'Polyolefin heat shrink tubing kits for electrical wire insulation, color-coding, and protection.',
    variants:[
      { id:9, label:'Standard', cartName:'Heat Shrink Tubes', price:246, specs:['Assorted Sizes','Flame Retardant','Insulating Polyolefin'] }
    ]
  },
  {
    groupId:'phenolic-board', name:'Phenolic Bread Board', category:'Accessories', icon:'grid', featured:false,
    image:'assets/images/products/Phenolic Resin Bread Board.jpg',
    desc:'Phenolic resin paper prototyping solder breadboard for permanent custom circuit building.',
    variants:[
      { id:10, label:'Standard', cartName:'Phenolic Bread Board', price:145, specs:['Single-sided PCB','Phenolic Resin','Pre-drilled Holes'] }
    ]
  },
  {
    groupId:'resistor', name:'Resistors Pack', category:'Components', icon:'circle', featured:false,
    image:'assets/images/products/Resistor.jpg',
    desc:'Metal film resistor pack containing standard resistance values for prototyping and electronics.',
    variants:[
      { id:11, label:'Pack', cartName:'Resistors Pack', price:142, specs:['Metal Film','1/4W 1% Tolerance','Assorted Values'] }
    ]
  },
  {
    groupId:'led', name:'LEDs Pack', category:'Components', icon:'lightbulb', featured:false,
    image:'assets/images/products/LED.jpg',
    desc:'Assorted LED light-emitting diodes kit in multiple colors (Red, Green, Blue, Yellow, White).',
    variants:[
      { id:12, label:'Pack', cartName:'LEDs Pack', price:143, specs:['Red/Green/Blue/Yellow/White','5mm Diameter','Diffused Lenses'] }
    ]
  },
  {
    groupId:'ir-proximity', name:'IR Proximity Sensor', category:'Sensors', icon:'eye', featured:false,
    image:'assets/images/products/IR Sensor.jpg',
    desc:'Infrared obstacle avoidance proximity sensor module with adjustable detection range.',
    variants:[
      { id:13, label:'Standard', cartName:'IR Proximity Sensor', price:182, specs:['Infrared Tx/Rx','Adjustable Range','Digital Output'] }
    ]
  },
  {
    groupId:'soil-moisture', name:'Soil Moisture Sensor', category:'Sensors', icon:'droplet', featured:false,
    image:'assets/images/products/Capacitive Soil Moisture.jpg',
    desc:'Soil moisture sensor module for measuring water content in soil or plant pots.',
    variants:[
      { id:14, label:'Standard', cartName:'Soil Moisture Sensor', price:172, specs:['Analog & Digital Out','Corrosion Resistant','LM393 Comparator'] }
    ]
  },
  {
    groupId:'pir-motion', name:'PIR Motion Sensor', category:'Sensors', icon:'eye', featured:false,
    image:'assets/images/products/PIR Sensor.jpg',
    desc:'Pyroelectric infrared PIR motion sensor module with adjustable sensitivity and delay.',
    variants:[
      { id:15, label:'Standard', cartName:'PIR Motion Sensor', price:150, specs:['Infrared Pyroelectric','Adjustable Delay','3-Pin Interface'] }
    ]
  },
  {
    groupId:'ultrasonic', name:'Ultrasonic Sensor', category:'Sensors', icon:'compass', featured:false,
    image:'assets/images/products/Ultrasonic Sensor.jpg',
    desc:'HC-SR04 non-contact ultrasonic distance measuring sensor module.',
    variants:[
      { id:16, label:'Standard', cartName:'Ultrasonic Sensor', price:168, specs:['HC-SR04 Module','Range 2cm-400cm','5V Operation'] }
    ]
  },
  {
    groupId:'light-sensor', name:'Light Intensity Sensor', category:'Sensors', icon:'sun', featured:false,
    image:'assets/images/products/Light Intensity Sensor.jpg',
    desc:'LDR photoresistor ambient light detection sensor module with digital output threshold.',
    variants:[
      { id:17, label:'Standard', cartName:'Light Sensor', price:168, specs:['LDR Photoresistor','Adjustable Threshold','DO & AO Outputs'] }
    ]
  },
  {
    groupId:'dht11', name:'DHT11 Temperature & Humidity', category:'Sensors', icon:'thermometer', featured:false,
    image:'assets/images/products/DHT11 Temperature & Humidity.jpg',
    desc:'Digital temperature and humidity sensor module with calibrated single-wire output.',
    variants:[
      { id:18, label:'Standard', cartName:'DHT11 Temp & Humidity Sensor', price:153, specs:['Temp & Humidity','Digital Single-wire','Calibrated Signal'] }
    ]
  },
  {
    groupId:'servo', name:'Servo Motor', category:'Accessories', icon:'refresh-cw', featured:false,
    image:'assets/images/products/Servo.jpg',
    desc:'High quality mini servo motors in standard 180° or continuous 360° rotation.',
    variants:[
      { id:19, label:'Servo 180°', cartName:'Servo 180', price:167, specs:['180° Rotation','5V Operation','3-Pin Connector','SG90 Mini Style'] },
      { id:20, label:'Servo 360°', cartName:'Servo 360', price:166, specs:['360° Rotation','5V Operation','3-Pin Connector','Continuous Rotation'] }
    ]
  },
  {
    groupId:'jumper-kit', name:'Jumper Wires Kit', category:'Accessories', icon:'git-branch', featured:false,
    image:'assets/images/products/Breadboard Wire.jpg',
    desc:'U-shape pre-cut pre-formed solid breadboard jumper wire kit in storage box.',
    variants:[
      { id:21, label:'Kit', cartName:'Jumper Wires Kit for Breadboard', price:142, specs:['U-shape Solid Wires','Multi-color Set','Storage Box Included'] }
    ]
  },
  {
    groupId:'jumper', name:'Jumper Wires Ribbon', category:'Accessories', icon:'git-branch', featured:false,
    image:'assets/images/products/Jumper wires.jpg',
    desc:'Rainbow-colored flexible jumper wire ribbons in multiple lengths and pin configurations.',
    variants:[
      { id:22, label:'M-M 20cm', cartName:'Male to Male Jumper Wire (20cm)', price:135, specs:['20cm Length','40 Pieces','Male to Male','Rainbow Ribbons'] },
      { id:23, label:'F-F 20cm', cartName:'Female to Female Jumper Wire (20cm)', price:135, specs:['20cm Length','40 Pieces','Female to Female','Rainbow Ribbons'] },
      { id:24, label:'M-F 20cm', cartName:'Male to Female (20cm)', price:135, specs:['20cm Length','40 Pieces','Male to Female','Rainbow Ribbons'] },
      { id:25, label:'M-F 30cm', cartName:'Male to Female (30cm)', price:144, specs:['30cm Length','40 Pieces','Male to Female','Rainbow Ribbons'] },
      { id:26, label:'M-M 30cm', cartName:'Male to Male (30cm)', price:144, specs:['30cm Length','40 Pieces','Male to Male','Rainbow Ribbons'] },
      { id:27, label:'F-F 30cm', cartName:'Female to Female (30 meters)', price:144, specs:['30cm Length','40 Pieces','Female to Female','Rainbow Ribbons'] }
    ]
  },
  {
    groupId:'oled', name:'OLED Display', category:'Displays', icon:'monitor', featured:true,
    image:'assets/images/products/OLED Display Module.jpg',
    desc:'Crisp 0.96 inch OLED with I2C interface. High contrast display readout screen.',
    variants:[
      { id:28, label:'Standard', cartName:'Oled Display', price:245, specs:['128x64 Resolution','I2C Interface','0.96 inch Screen','SSD1306 Driver'] }
    ]
  },
  {
    groupId:'buttons', name:'Buttons Pack', category:'Components', icon:'square', featured:false,
    image:'assets/images/products/Buttons.jpg',
    desc:'Pack of tactile push buttons — essential for user interaction in circuits.',
    variants:[
      { id:29, label:'Pack', cartName:'Buttons', price:145, specs:['Tactile Buttons','12x12mm Size','Through-Hole PCB Mount'] }
    ]
  },
  {
    groupId:'buzzer', name:'Buzzer', category:'Components', icon:'volume-2', featured:false,
    image:'assets/images/products/Buzzer.jpg',
    desc:'Active piezo electronic buzzer for alarm and sound notification output.',
    variants:[
      { id:30, label:'Active', cartName:'Buzzer', price:150, specs:['Active Piezo','5V DC','PCB Mountable'] }
    ]
  },
  {
    groupId:'arduino', name:'Arduino Uno R3', category:'Microcontrollers', icon:'cpu', featured:true,
    image:'assets/images/products/Arduino.jpg',
    desc:'Arduino Uno R3 development board for electronics prototyping and coding education.',
    variants:[
      { id:31, label:'Set', cartName:'Arduino Set', price:487, specs:['Arduino Uno R3','USB Cable Included','Breadboard & Jumpers'], image:'assets/images/products/Arduino.jpg' },
      { id:32, label:'Kit', cartName:'Arduino Kit', price:664, specs:['Arduino Uno R3','Complete Component Set','Tutorial Accessories'], image:'assets/images/products/Arduino Kit.jpg' }
    ]
  },
  {
    groupId:'breadboard', name:'Solderless Breadboard', category:'Accessories', icon:'grid', featured:false,
    image:'assets/images/products/Breadboard.jpg',
    desc:'Solderless prototyping breadboards. High quality ABS plastic with double sticky back.',
    variants:[
      { id:33, label:'Standard', cartName:'Breadboard Standard', price:147, specs:['830 Tie Points','Solderless','2 Power Rails'] },
      { id:34, label:'Mini', cartName:'Breadboard Mini', price:115, specs:['170 Tie Points','Solderless','Mini Prototyping'] }
    ]
  },
  {
    groupId:'rfid', name:'RC522 RFID Kit', category:'Sensors', icon:'radio', featured:false,
    image:'assets/images/products/RFID.jpg',
    desc:'13.56MHz RC522 RFID reader/writer module kit with key fob and smart card.',
    variants:[
      { id:35, label:'Kit', cartName:'RC552 Kit RFID', price:148, specs:['RC522 Module','SPI Interface','Includes Card & Keychain Fob'] }
    ]
  },
  {
    groupId:'psu-12v', name:'12V Power Supply', category:'Power', icon:'battery-charging', featured:true,
    image:'assets/images/products/Power Supply.jpg',
    desc:'Stable 12V SMPS with short-circuit & overvoltage protection. Two power ratings available.',
    variants:[
      { id:36, label:'10A', cartName:'12V Power Supply 10A', price:463, specs:['12V DC Output','10A / 120W','AC 100-240V Input'] },
      { id:37, label:'5A', cartName:'12V Power Supply 5A', price:310, specs:['12V DC Output','5A / 60W','AC 100-240V Input'] }
    ]
  },
  {
    groupId:'relay-24v', name:'24V Relay Module', category:'Relay Modules', icon:'zap', featured:true,
    image:'assets/images/products/Relay.jpg',
    desc:'Industrial-grade 24V relays with optocoupler isolation. Available in 1, 2, and 3 channel variants.',
    variants:[
      { id:38, label:'1 Channel', cartName:'24V Relay Module (1 Channel)', price:159, specs:['24V Coil','10A / 250VAC','Optocoupler Isolated'] },
      { id:39, label:'2 Channel', cartName:'24V Relay Module (2 Channels)', price:179, specs:['24V Coil','2 Channels','Optocoupler Isolated'] },
      { id:40, label:'3 Channel', cartName:'24V Relay Module (3 Channels)', price:229, specs:['24V Coil','3 Channels','Optocoupler Isolated'] }
    ]
  },
  {
    groupId:'mq2', name:'MQ2 Smoke Sensor', category:'Sensors', icon:'activity', featured:true,
    image:'assets/images/products/MQ2 Smoke Sensor.jpg',
    desc:'Detects LPG, propane, hydrogen, alcohol, and smoke. Essential for safety and automation systems.',
    variants:[
      { id:41, label:'Standard', cartName:'MQ2 Smoke Sensor', price:169, specs:['Analog & Digital Out','5V Operation','Fast Response'] }
    ]
  },
  {
    groupId:'cables', name:'USB Cable', category:'Accessories', icon:'usb', featured:false,
    image:'assets/images/products/Cables.jpg',
    desc:'Durable braided USB cables for powering and programming microcontroller boards.',
    variants:[
      { id:42, label:'Micro-USB', cartName:'Micro-USB Cable', price:91, specs:['1 Meter','Data & Power','Braided Nylon'] },
      { id:43, label:'Type C', cartName:'Type C Cable', price:94, specs:['1 Meter','Data & Power','Braided Nylon'] }
    ]
  },
  {
    groupId:'relay-5v', name:'5V Relay Module', category:'Relay Modules', icon:'zap', featured:false,
    image:'assets/images/products/Relay.jpg',
    desc:'5V relay modules compatible with Arduino & ESP32. Available in 1, 2, and 4 channel options.',
    variants:[
      { id:44, label:'1 Channel', cartName:'5v relay (1 channel)', price:149, specs:['5V Coil','1 Channel','Optocoupler Isolated'] },
      { id:45, label:'2 Channel', cartName:'5v relay (2 channel)', price:162, specs:['5V Coil','2 Channels','Optocoupler Isolated'] },
      { id:46, label:'4 Channel', cartName:'5v relay (4 channel)', price:200, specs:['5V Coil','4 Channels','Optocoupler Isolated'] }
    ]
  }
];

/* Flattened PRODUCTS array — used for cart lookups & search */
const PRODUCTS = PRODUCT_GROUPS.flatMap(g =>
  g.variants.map(v => ({
    id: v.id,
    name: v.cartName,
    category: g.category,
    price: v.price,
    icon: g.icon,
    groupId: g.groupId,
    desc: g.desc,
    specs: v.specs,
    featured: g.featured,
    inStock: true,
    image: v.image || g.image,
  }))
);

/* ============================================================
   CART STATE
   ============================================================ */
let cart = [];

function loadCart() {
  try { cart = JSON.parse(localStorage.getItem('tb_cart') || '[]'); }
  catch(e) { cart = []; }
}

function saveCart() { localStorage.setItem('tb_cart', JSON.stringify(cart)); }
function getCartCount() { return cart.reduce((s, i) => s + i.qty, 0); }
function getCartTotal() { return cart.reduce((s, i) => s + (i.price * i.qty), 0); }

/* ============================================================
   CART ACTIONS
   ============================================================ */
function addToCart(productId, qty) {
  qty = Math.max(1, parseInt(qty) || 1);
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) { existing.qty += qty; }
  else { cart.push({ id: product.id, name: product.name, price: product.price, icon: product.icon, image: product.image, qty }); }

  saveCart();
  updateCartBadge();
  renderCartItems();
  showToast((qty > 1 ? qty + '\u00D7 ' : '') + product.name + ' added to cart');

  document.querySelectorAll('.cart-badge').forEach(b => {
    b.classList.remove('bounce');
    void b.offsetWidth;
    b.classList.add('bounce');
    setTimeout(() => b.classList.remove('bounce'), 400);
  });
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart(); updateCartBadge(); renderCartItems();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(productId); return; }
  saveCart(); updateCartBadge(); renderCartItems();
}

/* ============================================================
   CART UI
   ============================================================ */
function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = count;
    b.classList.toggle('visible', count > 0);
  });
  const cb = document.getElementById('cart-count-badge');
  if (cb) cb.textContent = count;
}

function renderCartItems() {
  const body = document.getElementById('cart-body');
  const empty = document.getElementById('cart-empty');
  const totalVal = document.getElementById('cart-total-val');
  const subtotalVal = document.getElementById('cart-subtotal-val');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = '';
    if (empty) empty.style.display = 'flex';
  } else {
    if (empty) empty.style.display = 'none';
    body.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-thumb">
          <img src="${item.image || ''}" alt="${item.name}" onerror="this.style.display='none'">
          <i data-lucide="${item.icon}" class="product-icon-fallback" width="22" height="22"></i>
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">\u20B1${item.price.toLocaleString()}</div>
          <div class="cart-item-row">
            <div class="qty-controls">
              <button class="qty-btn" onclick="updateQty(${item.id},-1)">\u2212</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn" onclick="updateQty(${item.id},1)">+</button>
            </div>
            <button class="cart-remove" onclick="removeFromCart(${item.id})">Remove</button>
          </div>
        </div>
      </div>
    `).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  const total = getCartTotal();
  if (totalVal) totalVal.textContent = '\u20B1' + total.toLocaleString();
  if (subtotalVal) subtotalVal.textContent = '\u20B1' + total.toLocaleString();
}

function openCart() {
  document.getElementById('cart-sidebar')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  renderCartItems();
}

function closeCart() {
  document.getElementById('cart-sidebar')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
}

/* ============================================================
   ADD-TO-CART MODAL (injected on load)
   ============================================================ */
const MODAL_CSS = `
.add-modal-overlay{
  position:fixed;inset:0;z-index:3000;
  background:rgba(5,13,27,0.85);
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  display:flex;align-items:center;justify-content:center;padding:16px;
  opacity:0;pointer-events:none;
  transition:opacity 0.25s ease;
}
.add-modal-overlay.open{opacity:1;pointer-events:all;}
.add-modal{
  background:var(--bg-secondary);border:1px solid var(--border-bright);
  border-radius:20px;width:100%;max-width:470px;
  max-height:90vh;overflow-y:auto;
  transform:scale(0.88) translateY(28px);
  transition:transform 0.32s cubic-bezier(0.34,1.38,0.64,1);
  box-shadow:var(--shadow-card);
  scrollbar-width:thin;scrollbar-color:rgba(59,130,246,0.2) transparent;
}
.add-modal::-webkit-scrollbar{width:4px;}
.add-modal::-webkit-scrollbar-thumb{background:rgba(59,130,246,0.2);border-radius:4px;}
.add-modal-overlay.open .add-modal{transform:scale(1) translateY(0);}
.am-header{
  display:flex;align-items:center;gap:14px;
  padding:18px 18px 14px;
  border-bottom:1px solid var(--border);
  position:sticky;top:0;background:var(--bg-secondary);z-index:1;
}
.am-icon{
  width:50px;height:50px;border-radius:13px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  background:linear-gradient(135deg,rgba(59,130,246,0.15),rgba(29,78,216,0.1));
  border:1px solid rgba(59,130,246,0.2);color:#3B82F6;
}
.am-meta{flex:1;min-width:0;}
.am-name{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.05rem;color:var(--text-primary);margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.am-cat{font-size:0.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#60A5FA;}
.am-close{
  width:30px;height:30px;border-radius:8px;flex-shrink:0;
  background:var(--bg-card);border:1px solid var(--border);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;color:#64748B;font-size:14px;transition:all .15s;
}
.am-close:hover{color:var(--text-primary);border-color:var(--border-bright);background:var(--bg-card-hover);}
.am-body{padding:18px;}
.am-desc{font-size:.86rem;color:var(--text-secondary);line-height:1.65;margin-bottom:18px;padding-bottom:16px;border-bottom:1px solid var(--border);}
.am-label{font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#64748B;margin-bottom:10px;}

/* Variants */
.am-variants{margin-bottom:20px;}
.am-variant-grid{display:flex;flex-wrap:wrap;gap:8px;}
.am-vbtn{
  flex:1;min-width:calc(50% - 4px);
  display:flex;flex-direction:column;align-items:center;gap:4px;
  padding:11px 10px;border-radius:10px;cursor:pointer;
  background:var(--bg-card);border:1px solid var(--border);
  transition:all .18s ease;font-family:'Space Grotesk',sans-serif;
}
.am-vbtn:hover{border-color:rgba(59,130,246,.35);background:rgba(59,130,246,.08);}
.am-vbtn.active{border-color:#3B82F6;background:#3B82F6;box-shadow:0 0 0 2px rgba(59,130,246,.18);}
.am-vbtn-label{font-size:.84rem;font-weight:600;color:var(--text-primary);}
.am-vbtn-price{font-size:.82rem;font-weight:700;color:#3B82F6;}
.am-vbtn.active .am-vbtn-label{color:#fff;}
.am-vbtn.active .am-vbtn-price{color:#93C5FD;}
.am-spec-row{display:flex;flex-wrap:wrap;gap:5px;margin-top:10px;}
.am-spec{font-size:.7rem;padding:2px 7px;background:var(--bg-card);border:1px solid var(--border);border-radius:4px;color:var(--text-secondary);}

/* Quantity */
.am-qty{margin-bottom:20px;}
.am-stepper{
  display:inline-flex;align-items:center;
  background:var(--bg-card);border:1px solid var(--border);border-radius:10px;overflow:hidden;
}
.am-step-btn{
  width:44px;height:44px;display:flex;align-items:center;justify-content:center;
  background:none;border:none;cursor:pointer;color:var(--text-secondary);font-size:20px;font-weight:600;
  transition:all .15s;user-select:none;
}
.am-step-btn:hover{background:rgba(59,130,246,.12);color:#3B82F6;}
.am-step-btn:active{background:rgba(59,130,246,.2);}
.am-qty-num{
  width:60px;height:44px;
  background:none;border:none;border-left:1px solid var(--border);border-right:1px solid var(--border);
  color:var(--text-primary);text-align:center;font-family:'Space Grotesk',sans-serif;font-size:1.05rem;font-weight:700;outline:none;
}
.am-qty-num::-webkit-outer-spin-button,.am-qty-num::-webkit-inner-spin-button{-webkit-appearance:none;}

/* Price summary */
.am-summary{
  display:flex;align-items:center;justify-content:space-between;
  background:linear-gradient(135deg,rgba(59,130,246,.1),rgba(29,78,216,.06));
  border:1px solid rgba(59,130,246,.2);border-radius:10px;
  padding:12px 16px;margin-bottom:16px;
}
.am-summary-label{font-size:.82rem;color:var(--text-secondary);}
.am-summary-total{font-family:'Space Grotesk',sans-serif;font-size:1.2rem;font-weight:700;color:#3B82F6;}
.am-confirm{
  width:100%;padding:14px;
  background:linear-gradient(135deg,#3B82F6,#1D4ED8);
  border:none;border-radius:10px;
  font-family:'Space Grotesk',sans-serif;font-size:.95rem;font-weight:700;color:#fff;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:8px;
  transition:opacity .2s,transform .15s,box-shadow .2s;
  box-shadow:var(--shadow-btn);
}
.am-confirm:hover{opacity:.92;transform:translateY(-1px);box-shadow:var(--shadow-btn);}
.am-confirm:active{transform:scale(.98);}
@media(max-width:480px){
  .add-modal{border-radius:16px;}
  .am-vbtn{min-width:calc(50% - 4px);}
}
.am-image-wrap{
  width:100%;height:220px;background:var(--bg-card);
  border:1px solid var(--border);border-radius:12px;
  display:flex;align-items:center;justify-content:center;
  overflow:hidden;margin-bottom:18px;
}
.am-img{width:100%;height:100%;object-fit:contain;padding:12px;transition:transform 0.3s ease;}
.am-img:hover{transform:scale(1.04);}
`;

const MODAL_HTML = `
<div class="add-modal-overlay" id="add-modal-overlay">
  <div class="add-modal" role="dialog" aria-modal="true">
    <div class="am-header">
      <div class="am-icon"><i id="am-icon" data-lucide="cpu" width="26" height="26"></i></div>
      <div class="am-meta">
        <div class="am-name" id="am-name">Product</div>
        <div class="am-cat" id="am-cat">Category</div>
      </div>
      <button class="am-close" onclick="closeAddModal()" aria-label="Close">&#x2715;</button>
    </div>
    <div class="am-body">
      <div class="am-image-wrap"><img id="am-img" class="am-img" src="" alt="Product Image"></div>
      <p class="am-desc" id="am-desc"></p>

      <div id="am-variants" class="am-variants">
        <div class="am-label">Select Variant</div>
        <div class="am-variant-grid" id="am-variant-grid"></div>
        <div class="am-spec-row" id="am-specs"></div>
      </div>

      <div class="am-qty">
        <div class="am-label">Quantity</div>
        <div class="am-stepper">
          <button class="am-step-btn" onclick="changeModalQty(-1)" aria-label="Decrease">&#8722;</button>
          <input type="number" class="am-qty-num" id="am-qty" value="1" min="1" max="99" oninput="clampModalQty(); updateModalTotal();" aria-label="Quantity">
          <button class="am-step-btn" onclick="changeModalQty(1)" aria-label="Increase">+</button>
        </div>
      </div>

      <div class="am-summary">
        <span class="am-summary-label">Total Amount</span>
        <span class="am-summary-total" id="am-total">\u20B10</span>
      </div>

      <button class="am-confirm" id="am-confirm-btn" onclick="confirmAddToCart()">
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        Add to Cart
      </button>
    </div>
  </div>
</div>`;

/* Modal state */
let _mGroup = null;
let _mVariantId = null;

function injectModal() {
  const style = document.createElement('style');
  style.textContent = MODAL_CSS;
  document.head.appendChild(style);
  document.body.insertAdjacentHTML('beforeend', MODAL_HTML);
  document.getElementById('add-modal-overlay')?.addEventListener('click', e => {
    if (e.target.id === 'add-modal-overlay') closeAddModal();
  });
}

function openAddModal(groupId) {
  const group = PRODUCT_GROUPS.find(g => g.groupId === groupId);
  if (!group) return;
  _mGroup = group;
  _mVariantId = group.variants[0].id;

  document.getElementById('am-name').textContent = group.name;
  document.getElementById('am-cat').textContent = group.category;
  document.getElementById('am-desc').textContent = group.desc;
  const iconEl = document.getElementById('am-icon');
  if (iconEl) iconEl.setAttribute('data-lucide', group.icon);

  /* Set image */
  const imgEl = document.getElementById('am-img');
  if (imgEl) {
    const firstVar = group.variants[0];
    imgEl.src = firstVar.image || group.image || '';
  }

  /* Variants */
  const varSec = document.getElementById('am-variants');
  const isMulti = group.variants.length > 1;
  varSec.style.display = isMulti ? 'block' : 'none';
  if (isMulti) {
    document.getElementById('am-variant-grid').innerHTML = group.variants.map(v => `
      <button class="am-vbtn ${v.id === _mVariantId ? 'active' : ''}"
              onclick="selectModalVariant(${v.id})" data-vid="${v.id}">
        <span class="am-vbtn-label">${v.label}</span>
        <span class="am-vbtn-price">\u20B1${v.price.toLocaleString()}</span>
      </button>
    `).join('');
  }

  /* Reset qty */
  const qtyEl = document.getElementById('am-qty');
  if (qtyEl) qtyEl.value = 1;

  _refreshModalSpecs();
  updateModalTotal();

  document.getElementById('add-modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  if (typeof lucide !== 'undefined') lucide.createIcons();
  setTimeout(() => document.getElementById('am-qty')?.select(), 350);
}

function selectModalVariant(variantId) {
  _mVariantId = variantId;
  document.querySelectorAll('.am-vbtn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.vid) === variantId);
  });

  /* Update image if variant has custom image */
  const variant = _mGroup?.variants.find(v => v.id === variantId);
  const imgEl = document.getElementById('am-img');
  if (imgEl && variant) {
    imgEl.src = variant.image || _mGroup.image || '';
  }

  _refreshModalSpecs();
  updateModalTotal();
}

function _refreshModalSpecs() {
  const variant = _mGroup?.variants.find(v => v.id === _mVariantId);
  const el = document.getElementById('am-specs');
  if (!el || !variant) return;
  el.innerHTML = variant.specs.map(s => `<span class="am-spec">${s}</span>`).join('');
}

function updateModalTotal() {
  const variant = _mGroup?.variants.find(v => v.id === _mVariantId);
  const qty = Math.max(1, parseInt(document.getElementById('am-qty')?.value || 1));
  if (!variant) return;
  const el = document.getElementById('am-total');
  if (el) el.textContent = '\u20B1' + (variant.price * qty).toLocaleString();
}

function clampModalQty() {
  const input = document.getElementById('am-qty');
  if (!input) return;
  let v = parseInt(input.value);
  if (isNaN(v) || v < 1) v = 1;
  if (v > 99) v = 99;
  input.value = v;
}

function changeModalQty(delta) {
  const input = document.getElementById('am-qty');
  if (!input) return;
  input.value = Math.max(1, Math.min(99, parseInt(input.value || 1) + delta));
  updateModalTotal();
}

function closeAddModal() {
  document.getElementById('add-modal-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
  _mGroup = null; _mVariantId = null;
}

function confirmAddToCart() {
  const qty = Math.max(1, parseInt(document.getElementById('am-qty')?.value || 1));
  if (!_mVariantId) return;
  const btn = document.getElementById('am-confirm-btn');
  if (btn) {
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Added!`;
    btn.style.background = 'linear-gradient(135deg,#10B981,#059669)';
  }
  addToCart(_mVariantId, qty);
  setTimeout(() => {
    closeAddModal();
    if (btn) { btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Add to Cart`; btn.style.background = ''; }
  }, 700);
}

/* ============================================================
   TOAST
   ============================================================ */
function showToast(msg) {
  const wrap = document.querySelector('.toast-wrap');
  if (!wrap) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(12px)';
    setTimeout(() => t.remove(), 300);
  }, 3000);
}

/* Email cart */
function emailOrder() {
  if (typeof cart === 'undefined' || cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }
  const items = cart.map(i => `• ${i.name} x${i.qty} — ₱${(i.price * i.qty).toLocaleString()}`).join('\n');
  const total = `\n\nTotal: ₱${getCartTotal().toLocaleString()}`;
  const body = encodeURIComponent(`Hi Techy Box,\n\nI'd like to order:\n\n${items}${total}\n\nPlease let me know the shipping details. Thank you!`);
  window.open(`mailto:techybox26@gmail.com?subject=Order Inquiry — Techy Box&body=${body}`, '_blank');
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  updateCartBadge();
  injectModal();

  const initListeners = () => {
    document.querySelector('.cart-btn')?.addEventListener('click', openCart);
    document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
    document.getElementById('cart-close-btn')?.addEventListener('click', closeCart);
  };

  if (document.getElementById('cart-overlay')) {
    initListeners();
  } else {
    window.addEventListener('componentsLoaded', initListeners);
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeCart(); closeAddModal(); }
  });
});
