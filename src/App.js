
import { useState, useMemo } from "react";
 
const IMG = {
  rtx5090: "https://www.techpowerup.com/gpu-specs/images/c/4089.jpg",
  rtx5080: "https://www.techpowerup.com/gpu-specs/images/c/4088.jpg",
  rtx5070ti: "https://www.techpowerup.com/gpu-specs/images/c/4087.jpg",
  rtx5070: "https://www.techpowerup.com/gpu-specs/images/c/4086.jpg",
  rtx5060ti16: "https://www.techpowerup.com/gpu-specs/images/c/4085.jpg",
  rtx5060ti8: "https://www.techpowerup.com/gpu-specs/images/c/4084.jpg",
  rtx5060: "https://www.techpowerup.com/gpu-specs/images/c/4083.jpg",
  rtx5050: "https://www.techpowerup.com/gpu-specs/images/c/4082.jpg",
  rtx4090: "https://www.techpowerup.com/gpu-specs/images/c/3702.jpg",
  rtx4080s: "https://www.techpowerup.com/gpu-specs/images/c/3922.jpg",
  rtx4080: "https://www.techpowerup.com/gpu-specs/images/c/3761.jpg",
  rtx4070tis: "https://www.techpowerup.com/gpu-specs/images/c/3921.jpg",
  rtx4070ti: "https://www.techpowerup.com/gpu-specs/images/c/3859.jpg",
  rtx4070s: "https://www.techpowerup.com/gpu-specs/images/c/3920.jpg",
  rtx4070: "https://www.techpowerup.com/gpu-specs/images/c/3799.jpg",
  rtx4060ti: "https://www.techpowerup.com/gpu-specs/images/c/3832.jpg",
  rtx4060: "https://www.techpowerup.com/gpu-specs/images/c/3831.jpg",
  rx9070xt: "https://www.techpowerup.com/gpu-specs/images/c/4076.jpg",
  rx9070: "https://www.techpowerup.com/gpu-specs/images/c/4077.jpg",
  rx9060xt: "https://www.techpowerup.com/gpu-specs/images/c/4078.jpg",
  rx7900xtx: "https://www.techpowerup.com/gpu-specs/images/c/3798.jpg",
  rx7900xt: "https://www.techpowerup.com/gpu-specs/images/c/3797.jpg",
  rx7800xt: "https://www.techpowerup.com/gpu-specs/images/c/3894.jpg",
  rx7700xt: "https://www.techpowerup.com/gpu-specs/images/c/3895.jpg",
  rx7600xt: "https://www.techpowerup.com/gpu-specs/images/c/3996.jpg",
  rx7600: "https://www.techpowerup.com/gpu-specs/images/c/3850.jpg",
  arcb580: "https://www.techpowerup.com/gpu-specs/images/c/4010.jpg",
  arcb570: "https://www.techpowerup.com/gpu-specs/images/c/4011.jpg",
  arca770: "https://www.techpowerup.com/gpu-specs/images/c/3626.jpg",
  arca750: "https://www.techpowerup.com/gpu-specs/images/c/3625.jpg",
  default_cpu: "https://www.techpowerup.com/cpu-specs/images/c/2022122901.jpg",
  default_ram: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzPvOlIWh6ZMpGPpJeYh8k6pWQwOGvUqGJIA&s",
  default_psu: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX3zFVBZqeqhHLBnEWxJ3FrZ_FIaJbNQxkzw&s",
  default_mb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6-7JT5MqWnXoZe6kHHgHMkwJkFfqXGFhHJA&s",
  default_ssd: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKJlZfMmWrmqHVIf2yf9LqHT-8H5cMpDpqkA&s",
  default_cooler: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbLH3KbF3ZlJV3bvYlrNtbGixNv6JZzXUxNA&s",
  default_case: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH3J2XqUqH2WZjLk3RVyDKXbmJJNqUSXEPXA&s",
};
 
function getImg(id, type) {
  if (IMG[id]) return IMG[id];
  const fallbacks = { CPU: IMG.default_cpu, RAM: IMG.default_ram, PSU: IMG.default_psu, Motherboard: IMG.default_mb, SSD: IMG.default_ssd, Cooler: IMG.default_cooler, Case: IMG.default_case };
  return fallbacks[type] || IMG.default_cpu;
}
 
const allParts = [
  // NVIDIA RTX 50
  { id:"rtx5090", type:"GPU", company:"NVIDIA", series:"RTX 50 Series", name:"RTX 5090", specs:"32GB GDDR7 · 575W · 8K · DLSS 4", priceSAR:7495, score:99, tag:"Flagship", color:"#76b900" },
  { id:"rtx5080", type:"GPU", company:"NVIDIA", series:"RTX 50 Series", name:"RTX 5080", specs:"16GB GDDR7 · 360W · 4K Ultra · DLSS 4", priceSAR:3745, score:97, tag:"Elite", color:"#76b900" },
  { id:"rtx5070ti", type:"GPU", company:"NVIDIA", series:"RTX 50 Series", name:"RTX 5070 Ti", specs:"16GB GDDR7 · 300W · 4K · DLSS 4", priceSAR:2810, score:94, tag:"Pro", color:"#76b900" },
  { id:"rtx5070", type:"GPU", company:"NVIDIA", series:"RTX 50 Series", name:"RTX 5070", specs:"12GB GDDR7 · 250W · 1440p/4K · DLSS 4", priceSAR:2060, score:90, tag:"⭐ Top Pick", color:"#76b900" },
  { id:"rtx5060ti16", type:"GPU", company:"NVIDIA", series:"RTX 50 Series", name:"RTX 5060 Ti 16GB", specs:"16GB GDDR7 · 180W · 1440p · DLSS 4", priceSAR:1612, score:83, tag:"Best Value", color:"#76b900" },
  { id:"rtx5060ti8", type:"GPU", company:"NVIDIA", series:"RTX 50 Series", name:"RTX 5060 Ti 8GB", specs:"8GB GDDR7 · 160W · 1080p/1440p", priceSAR:1425, score:79, tag:"Value", color:"#76b900" },
  { id:"rtx5060", type:"GPU", company:"NVIDIA", series:"RTX 50 Series", name:"RTX 5060", specs:"8GB GDDR7 · 115W · 1080p · DLSS 4", priceSAR:1125, score:72, tag:"Entry", color:"#76b900" },
  { id:"rtx5050", type:"GPU", company:"NVIDIA", series:"RTX 50 Series", name:"RTX 5050", specs:"8GB GDDR7 · 70W · Mobile/Budget", priceSAR:850, score:65, tag:"Budget", color:"#76b900" },
  // NVIDIA RTX 40
  { id:"rtx4090", type:"GPU", company:"NVIDIA", series:"RTX 40 Series", name:"RTX 4090", specs:"24GB GDDR6X · 450W · 8K · DLSS 3", priceSAR:6800, score:98, tag:"Flagship", color:"#76b900" },
  { id:"rtx4080s", type:"GPU", company:"NVIDIA", series:"RTX 40 Series", name:"RTX 4080 SUPER", specs:"16GB GDDR6X · 320W · 4K Ultra", priceSAR:3200, score:93, tag:"Elite", color:"#76b900" },
  { id:"rtx4080", type:"GPU", company:"NVIDIA", series:"RTX 40 Series", name:"RTX 4080", specs:"16GB GDDR6X · 320W · 4K", priceSAR:2900, score:91, tag:"High-End", color:"#76b900" },
  { id:"rtx4070tis", type:"GPU", company:"NVIDIA", series:"RTX 40 Series", name:"RTX 4070 Ti SUPER", specs:"16GB GDDR6X · 285W · 4K", priceSAR:2400, score:89, tag:"Pro", color:"#76b900" },
  { id:"rtx4070ti", type:"GPU", company:"NVIDIA", series:"RTX 40 Series", name:"RTX 4070 Ti", specs:"12GB GDDR6X · 285W · 4K", priceSAR:2100, score:87, tag:"Pro", color:"#76b900" },
  { id:"rtx4070s", type:"GPU", company:"NVIDIA", series:"RTX 40 Series", name:"RTX 4070 SUPER", specs:"12GB GDDR6X · 220W · 1440p/4K", priceSAR:1800, score:85, tag:"⭐ 1440p", color:"#76b900" },
  { id:"rtx4070", type:"GPU", company:"NVIDIA", series:"RTX 40 Series", name:"RTX 4070", specs:"12GB GDDR6X · 200W · 1440p", priceSAR:1600, score:82, tag:"Mid", color:"#76b900" },
  { id:"rtx4060ti", type:"GPU", company:"NVIDIA", series:"RTX 40 Series", name:"RTX 4060 Ti", specs:"8GB GDDR6 · 160W · 1080p/1440p", priceSAR:1200, score:76, tag:"Mid", color:"#76b900" },
  { id:"rtx4060", type:"GPU", company:"NVIDIA", series:"RTX 40 Series", name:"RTX 4060", specs:"8GB GDDR6 · 115W · 1080p", priceSAR:950, score:70, tag:"Budget", color:"#76b900" },
  // AMD RX 9000
  { id:"rx9070xt", type:"GPU", company:"AMD", series:"RX 9000 Series", name:"RX 9070 XT", specs:"16GB GDDR6 · 304W · 4K · FSR 4", priceSAR:2100, score:91, tag:"⭐ Best AMD", color:"#ED1C24" },
  { id:"rx9070", type:"GPU", company:"AMD", series:"RX 9000 Series", name:"RX 9070", specs:"16GB GDDR6 · 220W · 1440p/4K", priceSAR:1750, score:87, tag:"Pro", color:"#ED1C24" },
  { id:"rx9060xt", type:"GPU", company:"AMD", series:"RX 9000 Series", name:"RX 9060 XT", specs:"16GB GDDR6 · 150W · 1440p", priceSAR:1350, score:80, tag:"Value", color:"#ED1C24" },
  // AMD RX 7000
  { id:"rx7900xtx", type:"GPU", company:"AMD", series:"RX 7000 Series", name:"RX 7900 XTX", specs:"24GB GDDR6 · 355W · 4K · FSR 3", priceSAR:3200, score:94, tag:"Flagship", color:"#ED1C24" },
  { id:"rx7900xt", type:"GPU", company:"AMD", series:"RX 7000 Series", name:"RX 7900 XT", specs:"20GB GDDR6 · 315W · 4K", priceSAR:2600, score:90, tag:"Elite", color:"#ED1C24" },
  { id:"rx7800xt", type:"GPU", company:"AMD", series:"RX 7000 Series", name:"RX 7800 XT", specs:"16GB GDDR6 · 263W · 1440p", priceSAR:1600, score:83, tag:"⭐ 1440p", color:"#ED1C24" },
  { id:"rx7700xt", type:"GPU", company:"AMD", series:"RX 7000 Series", name:"RX 7700 XT", specs:"12GB GDDR6 · 245W · 1440p", priceSAR:1350, score:79, tag:"Value", color:"#ED1C24" },
  { id:"rx7600xt", type:"GPU", company:"AMD", series:"RX 7000 Series", name:"RX 7600 XT", specs:"16GB GDDR6 · 165W · 1080p", priceSAR:1050, score:73, tag:"Budget", color:"#ED1C24" },
  { id:"rx7600", type:"GPU", company:"AMD", series:"RX 7000 Series", name:"RX 7600", specs:"8GB GDDR6 · 165W · 1080p", priceSAR:850, score:68, tag:"Entry", color:"#ED1C24" },
  // Intel Arc
  { id:"arcb580", type:"GPU", company:"Intel", series:"Arc B Series", name:"Arc B580", specs:"12GB GDDR6 · 190W · 1440p · XeSS", priceSAR:950, score:75, tag:"⭐ Best Value", color:"#0068B5" },
  { id:"arcb570", type:"GPU", company:"Intel", series:"Arc B Series", name:"Arc B570", specs:"10GB GDDR6 · 150W · 1080p", priceSAR:750, score:69, tag:"Budget", color:"#0068B5" },
  { id:"arca770", type:"GPU", company:"Intel", series:"Arc A Series", name:"Arc A770", specs:"16GB GDDR6 · 225W · 1440p", priceSAR:900, score:72, tag:"Value", color:"#0068B5" },
  { id:"arca750", type:"GPU", company:"Intel", series:"Arc A Series", name:"Arc A750", specs:"8GB GDDR6 · 225W · 1080p", priceSAR:700, score:67, tag:"Budget", color:"#0068B5" },
  // CPU Intel
  { id:"i5_14400f", type:"CPU", company:"Intel", series:"Intel 14th Gen", name:"Core i5-14400F", specs:"10 نواة · 4.7GHz · LGA1700 · 65W", priceSAR:700, score:72, tag:"Budget", color:"#0068B5" },
  { id:"i5_14600k", type:"CPU", company:"Intel", series:"Intel 14th Gen", name:"Core i5-14600K", specs:"14 نواة · 5.3GHz · LGA1700 · OC", priceSAR:900, score:80, tag:"Best Value", color:"#0068B5" },
  { id:"i7_14700k", type:"CPU", company:"Intel", series:"Intel 14th Gen", name:"Core i7-14700K", specs:"20 نواة · 5.6GHz · LGA1700 · OC", priceSAR:1400, score:88, tag:"Pro", color:"#0068B5" },
  { id:"i9_14900k", type:"CPU", company:"Intel", series:"Intel 14th Gen", name:"Core i9-14900K", specs:"24 نواة · 6.0GHz · LGA1700 · OC", priceSAR:2100, score:95, tag:"Elite", color:"#0068B5" },
  { id:"r5_9600x", type:"CPU", company:"AMD", series:"AMD Ryzen 9000", name:"Ryzen 5 9600X", specs:"6 نواة · 5.4GHz · AM5 · 65W", priceSAR:1050, score:78, tag:"Efficient", color:"#ED1C24" },
  { id:"r7_9700x", type:"CPU", company:"AMD", series:"AMD Ryzen 9000", name:"Ryzen 7 9700X", specs:"8 نواة · 5.5GHz · AM5 · 65W", priceSAR:1350, score:84, tag:"Balance", color:"#ED1C24" },
  { id:"r7_9800x3d", type:"CPU", company:"AMD", series:"AMD Ryzen 9000", name:"Ryzen 7 9800X3D", specs:"8 نواة · 5.7GHz · AM5 · 3D Cache", priceSAR:1575, score:99, tag:"⭐ Gaming King", color:"#ED1C24" },
  { id:"r9_9950x", type:"CPU", company:"AMD", series:"AMD Ryzen 9000", name:"Ryzen 9 9950X", specs:"16 نواة · 5.7GHz · AM5 · Workstation", priceSAR:2440, score:96, tag:"Workstation", color:"#ED1C24" },
  // RAM
  { id:"ram_16_ddr5", type:"RAM", company:"Kingston", series:"DDR5", name:"FURY Beast 16GB DDR5", specs:"16GB · DDR5-5600MHz", priceSAR:280, score:70, tag:"Entry", color:"#22c55e" },
  { id:"ram_32_corsair", type:"RAM", company:"Corsair", series:"DDR5", name:"Vengeance 32GB DDR5", specs:"32GB · DDR5-6000MHz", priceSAR:420, score:85, tag:"⭐ Best Pick", color:"#22c55e" },
  { id:"ram_32_gskill", type:"RAM", company:"G.Skill", series:"DDR5", name:"Trident Z5 32GB RGB", specs:"32GB · DDR5-6000MHz · RGB", priceSAR:490, score:87, tag:"RGB", color:"#22c55e" },
  { id:"ram_64", type:"RAM", company:"Corsair", series:"DDR5", name:"Vengeance 64GB DDR5", specs:"64GB · DDR5-6000MHz", priceSAR:850, score:90, tag:"Pro", color:"#22c55e" },
  // PSU
  { id:"psu_650", type:"PSU", company:"Cooler Master", series:"80+ Gold", name:"MWE Gold 650W", specs:"650W · 80+ Gold · Semi Modular", priceSAR:280, score:72, tag:"Entry", color:"#fbbf24" },
  { id:"psu_750", type:"PSU", company:"Corsair", series:"80+ Gold", name:"RM750e 750W", specs:"750W · 80+ Gold · Full Modular", priceSAR:380, score:85, tag:"⭐ Best Value", color:"#fbbf24" },
  { id:"psu_850", type:"PSU", company:"Seasonic", series:"80+ Gold", name:"Focus GX 850W", specs:"850W · 80+ Gold · Fully Modular · 10yr", priceSAR:530, score:93, tag:"Premium", color:"#fbbf24" },
  { id:"psu_1000", type:"PSU", company:"Corsair", series:"80+ Platinum", name:"HX1000 1000W", specs:"1000W · 80+ Platinum · Fully Modular", priceSAR:750, score:95, tag:"Platinum", color:"#fbbf24" },
  // Motherboard
  { id:"mb_b760", type:"Motherboard", company:"MSI", series:"Intel B760", name:"PRO B760M-P DDR5", specs:"B760 · LGA1700 · DDR5 · mATX", priceSAR:659, score:72, tag:"Budget", color:"#f97316" },
  { id:"mb_z790", type:"Motherboard", company:"ASUS", series:"Intel Z790", name:"TUF Gaming Z790-Plus WiFi", specs:"Z790 · LGA1700 · DDR5 · WiFi6E", priceSAR:1629, score:88, tag:"Gaming", color:"#f97316" },
  { id:"mb_b850", type:"Motherboard", company:"Gigabyte", series:"AMD B850", name:"B850 Aorus Elite WiFi7", specs:"B850 · AM5 · DDR5 · WiFi7", priceSAR:935, score:85, tag:"⭐ Best AMD", color:"#f97316" },
  { id:"mb_x870e", type:"Motherboard", company:"MSI", series:"AMD X870E", name:"MEG X870E ACE", specs:"X870E · AM5 · DDR5 · WiFi7", priceSAR:2199, score:95, tag:"Flagship", color:"#f97316" },
  // SSD
  { id:"ssd_samsung", type:"SSD", company:"Samsung", series:"NVMe Gen4", name:"980 PRO 1TB", specs:"1TB · PCIe 4.0 · 7000MB/s", priceSAR:350, score:88, tag:"⭐ Best Pick", color:"#06b6d4" },
  { id:"ssd_wd", type:"SSD", company:"WD", series:"NVMe Gen4", name:"Black SN850X 2TB", specs:"2TB · PCIe 4.0 · 7300MB/s", priceSAR:600, score:92, tag:"Pro", color:"#06b6d4" },
  { id:"ssd_kv2", type:"SSD", company:"Kingston", series:"NVMe Gen3", name:"NV2 1TB", specs:"1TB · PCIe 3.0 · 3500MB/s", priceSAR:200, score:70, tag:"Budget", color:"#06b6d4" },
  // Cooler
  { id:"cool_noctua", type:"Cooler", company:"Noctua", series:"Air Cooling", name:"NH-D15 Dual Tower", specs:"Air · Dual Tower · 280W TDP", priceSAR:380, score:90, tag:"⭐ Best Air", color:"#ec4899" },
  { id:"cool_dp240", type:"Cooler", company:"DeepCool", series:"AIO 240mm", name:"LT240 AIO 240mm", specs:"AIO · 240mm · ARGB", priceSAR:300, score:82, tag:"Value", color:"#ec4899" },
  { id:"cool_h150i", type:"Cooler", company:"Corsair", series:"AIO 360mm", name:"iCUE H150i 360mm", specs:"AIO · 360mm · RGB · Premium", priceSAR:580, score:93, tag:"⭐ Premium", color:"#ec4899" },
  // Case
  { id:"case_lianli", type:"Case", company:"Lian Li", series:"Mid Tower", name:"O11 Dynamic Mid Tower", specs:"Mid Tower · ATX · Dual Chamber", priceSAR:600, score:92, tag:"⭐ Premium", color:"#64748b" },
  { id:"case_corsair", type:"Case", company:"Corsair", series:"Mid Tower", name:"4000D Airflow", specs:"Mid Tower · ATX · 3 Fans", priceSAR:350, score:82, tag:"Value", color:"#64748b" },
  { id:"case_fractal", type:"Case", company:"Fractal", series:"Mid Tower", name:"North Charcoal", specs:"Mid Tower · ATX · Silent Design", priceSAR:500, score:88, tag:"Design", color:"#64748b" },
];
 
const sidebarCategories = [
  { label:"🎮 GPU كروت الشاشة", type:"GPU", subs:[
    { label:"NVIDIA RTX 50", series:"RTX 50 Series" },
    { label:"NVIDIA RTX 40", series:"RTX 40 Series" },
    { label:"AMD RX 9000", series:"RX 9000 Series" },
    { label:"AMD RX 7000", series:"RX 7000 Series" },
    { label:"Intel Arc B", series:"Arc B Series" },
    { label:"Intel Arc A", series:"Arc A Series" },
  ]},
  { label:"⚡ CPU المعالجات", type:"CPU", subs:[
    { label:"Intel 14th Gen", series:"Intel 14th Gen" },
    { label:"AMD Ryzen 9000", series:"AMD Ryzen 9000" },
  ]},
  { label:"💾 RAM الرامات", type:"RAM", subs:[{ label:"DDR5", series:"DDR5" }] },
  { label:"🔌 PSU مزود الطاقة", type:"PSU", subs:[{ label:"80+ Gold", series:"80+ Gold" }, { label:"80+ Platinum", series:"80+ Platinum" }] },
  { label:"🔧 Motherboard اللوحة الأم", type:"Motherboard", subs:[{ label:"Intel B760/Z790", company:"Intel" }, { label:"AMD B850/X870", company:"AMD" }] },
  { label:"💿 SSD التخزين", type:"SSD", subs:[{ label:"NVMe Gen4", series:"NVMe Gen4" }, { label:"NVMe Gen3", series:"NVMe Gen3" }] },
  { label:"❄️ Cooler التبريد", type:"Cooler", subs:[{ label:"Air Cooling", series:"Air Cooling" }, { label:"AIO 240mm", series:"AIO 240mm" }, { label:"AIO 360mm", series:"AIO 360mm" }] },
  { label:"📦 Case الكيس", type:"Case", subs:[{ label:"Mid Tower", series:"Mid Tower" }] },
];
 
const typeIcons = { GPU:"🎮", CPU:"⚡", RAM:"💾", PSU:"🔌", Motherboard:"🔧", SSD:"💿", Cooler:"❄️", Case:"📦" };
 
async function askAI(name, specs, type) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        model:"claude-sonnet-4-20250514",
        max_tokens:350,
        messages:[{ role:"user", content:`اشرح هذه القطعة بالعربي في 3 نقاط مختصرة:\nالقطعة: ${name} (${type})\nالمواصفات: ${specs}\n\n1. وظيفتها\n2. من يحتاجها\n3. هل تستحق سعرها؟` }]
      })
    });
    const data = await res.json();
    return data.content?.[0]?.text || "حدث خطأ";
  } catch {
    return "⚠️ تعذر الاتصال بالـ AI";
  }
}
 
export default function App() {
  const [activeType, setActiveType] = useState(null);
  const [activeSeries, setActiveSeries] = useState(null);
  const [activeCompany, setActiveCompany] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("score");
  const [selected, setSelected] = useState(null);
  const [aiText, setAiText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [build, setBuild] = useState({});
  const [expandedCat, setExpandedCat] = useState("GPU");
  const [imgErrors, setImgErrors] = useState({});
 
  const filtered = useMemo(() => {
    let list = allParts;
    if (activeType) list = list.filter(p => p.type === activeType);
    if (activeSeries) list = list.filter(p => p.series === activeSeries);
    if (activeCompany && !activeSeries) list = list.filter(p => p.company === activeCompany);
    if (search) list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.company.toLowerCase().includes(search.toLowerCase()) ||
      p.series.toLowerCase().includes(search.toLowerCase())
    );
    return list.sort((a,b) => sort==="score" ? b.score-a.score : sort==="asc" ? a.priceSAR-b.priceSAR : b.priceSAR-a.priceSAR);
  }, [activeType, activeSeries, activeCompany, search, sort]);
 
  const buildList = Object.values(build).map(id => allParts.find(p => p.id===id)).filter(Boolean);
  const buildTotal = buildList.reduce((s,p) => s+p.priceSAR, 0);
 
  const openPart = async (part) => {
    setSelected(part);
    setAiText("");
    setAiLoading(true);
    const text = await askAI(part.name, part.specs, part.type);
    setAiText(text);
    setAiLoading(false);
  };
 
  const PartImg = ({ part, height=130, style={} }) => {
    const src = imgErrors[part.id] ? null : getImg(part.id, part.type);
    return (
      <div style={{ height, background:`linear-gradient(135deg,${part.color}22,#0f1b2d)`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", ...style }}>
        {src && !imgErrors[part.id] ? (
          <img
            src={src}
            alt={part.name}
            onError={() => setImgErrors(prev=>({...prev,[part.id]:true}))}
            style={{ width:"100%", height:"100%", objectFit:"contain", padding:8 }}
          />
        ) : (
          <div style={{ fontSize:44, opacity:0.25 }}>{typeIcons[part.type]||"🔧"}</div>
        )}
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(to bottom, transparent 50%, #16213e)` }} />
      </div>
    );
  };
 
  return (
    <div style={{ minHeight:"100vh", background:"#1a1a2e", color:"#e2e8f0", fontFamily:"'Tajawal',sans-serif", direction:"rtl", display:"flex", flexDirection:"column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-thumb{background:#7c3aed55;border-radius:3px;}
        .card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,0.5);}
        .card{transition:all 0.2s;}
        .sbtn:hover{background:rgba(124,58,237,0.15)!important;color:#c4b5fd!important;}
      `}</style>
 
      {/* NAVBAR */}
      <nav style={{ background:"#16213e", borderBottom:"1px solid #0f3460", padding:"0 16px", display:"flex", alignItems:"center", gap:12, height:54, position:"sticky", top:0, zIndex:100, flexShrink:0 }}>
        <div style={{ fontWeight:900, fontSize:15, color:"#7c3aed", whiteSpace:"nowrap" }}>🖥️ PC BUILDER SA</div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 ابحث..." style={{ flex:1, maxWidth:380, background:"#0f3460", border:"1px solid #1e4080", borderRadius:8, padding:"6px 12px", color:"#fff", fontSize:12, outline:"none" }} />
        <select value={sort} onChange={e=>setSort(e.target.value)} style={{ background:"#0f3460", border:"1px solid #1e4080", borderRadius:7, padding:"5px 8px", color:"#94a3b8", fontSize:11, cursor:"pointer" }}>
          <option value="score">الأداء</option>
          <option value="asc">السعر ↑</option>
          <option value="desc">السعر ↓</option>
        </select>
        {buildTotal > 0 && (
          <div style={{ background:"linear-gradient(135deg,#7c3aed,#6d28d9)", borderRadius:8, padding:"5px 12px", fontSize:11, fontWeight:700, whiteSpace:"nowrap" }}>
            🛒 {buildList.length} · <span style={{ direction:"ltr", display:"inline-block" }}>{buildTotal.toLocaleString()} ر.س</span>
          </div>
        )}
      </nav>
 
      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
 
        {/* SIDEBAR */}
        <aside style={{ width:210, minWidth:210, background:"#0d1b2a", borderLeft:"1px solid #0f3460", padding:"10px 6px", overflowY:"auto", height:"calc(100vh - 54px)", position:"sticky", top:54 }}>
          <div style={{ fontSize:9, color:"#334155", fontWeight:700, letterSpacing:2, padding:"2px 8px 8px" }}>CATEGORIES</div>
 
          <button className="sbtn" onClick={()=>{ setActiveType(null); setActiveSeries(null); setActiveCompany(null); }} style={{ width:"100%", background:!activeType?"rgba(124,58,237,0.2)":"none", border:`1px solid ${!activeType?"#7c3aed44":"transparent"}`, borderRadius:7, padding:"6px 10px", color:!activeType?"#a78bfa":"#64748b", cursor:"pointer", fontSize:11, fontWeight:700, textAlign:"right", marginBottom:3 }}>
            📋 جميع القطع ({allParts.length})
          </button>
 
          {sidebarCategories.map(cat => (
            <div key={cat.type} style={{ marginBottom:2 }}>
              <button className="sbtn" onClick={()=>{ setExpandedCat(expandedCat===cat.type?null:cat.type); setActiveType(cat.type); setActiveSeries(null); setActiveCompany(null); }}
                style={{ width:"100%", background:activeType===cat.type&&!activeSeries&&!activeCompany?"rgba(124,58,237,0.15)":"none", border:"none", borderRadius:7, padding:"6px 10px", color:activeType===cat.type?"#c4b5fd":"#94a3b8", cursor:"pointer", fontSize:11, fontWeight:700, textAlign:"right", display:"flex", justifyContent:"space-between" }}>
                <span>{cat.label}</span>
                <span style={{ fontSize:9, color:"#334155" }}>{expandedCat===cat.type?"▲":"▼"}</span>
              </button>
              {expandedCat===cat.type && (
                <div style={{ paddingRight:10, marginTop:1 }}>
                  {cat.subs.map(sub => {
                    const isActive = activeSeries===sub.series && (!sub.company||activeCompany===sub.company);
                    const count = allParts.filter(p => p.type===cat.type && (!sub.series||p.series===sub.series) && (!sub.company||p.company===sub.company)).length;
                    return (
                      <button key={sub.label} className="sbtn" onClick={()=>{ setActiveType(cat.type); setActiveSeries(sub.series||null); setActiveCompany(sub.company||null); }}
                        style={{ width:"100%", background:isActive?"rgba(124,58,237,0.2)":"none", border:`1px solid ${isActive?"#7c3aed33":"transparent"}`, borderRadius:6, padding:"4px 10px", color:isActive?"#a78bfa":"#64748b", cursor:"pointer", fontSize:10, textAlign:"right", marginBottom:1, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span>{isActive?"▶ ":""}{sub.label}</span>
                        <span style={{ fontSize:9, color:"#1e3a5f", background:"#0f1b2d", borderRadius:4, padding:"1px 5px" }}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </aside>
 
        {/* MAIN */}
        <main style={{ flex:1, padding:"14px 16px", overflowY:"auto", height:"calc(100vh - 54px)" }}>
 
          {/* Hero */}
          {!activeType && !search && (
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:11, color:"#64748b", fontWeight:700, marginBottom:8, letterSpacing:1 }}>⭐ FEATURED</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
                {allParts.filter(p=>p.tag.includes("⭐")).slice(0,3).map(p => (
                  <div key={p.id} className="card" onClick={()=>openPart(p)} style={{ borderRadius:12, overflow:"hidden", cursor:"pointer", position:"relative", height:170, border:`1px solid ${p.color}33` }}>
                    <PartImg part={p} height={170} style={{ borderRadius:12 }} />
                    <div style={{ position:"absolute", top:8, right:8 }}>
                      <span style={{ background:p.color, borderRadius:4, padding:"1px 7px", fontSize:9, fontWeight:700, color:"#000" }}>{p.type}</span>
                    </div>
                    <div style={{ position:"absolute", bottom:0, right:0, left:0, padding:"10px 12px" }}>
                      <div style={{ fontWeight:900, fontSize:14, color:"#fff", textShadow:"0 2px 8px rgba(0,0,0,0.9)" }}>{p.name}</div>
                      <div style={{ fontWeight:900, fontSize:13, color:p.color, direction:"ltr", display:"inline-block", marginTop:2 }}>{p.priceSAR.toLocaleString()} ر.س</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
 
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#e2e8f0" }}>
              {activeSeries || (activeType ? `${typeIcons[activeType]} ${activeType}` : "📋 جميع القطع")}
            </div>
            <span style={{ fontSize:10, color:"#334155" }}>{filtered.length} نتيجة</span>
          </div>
 
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(185px,1fr))", gap:10 }}>
            {filtered.map(p => (
              <div key={p.id} className="card" onClick={()=>openPart(p)} style={{ background:"#16213e", border:`1px solid ${build[p.type]===p.id?"#22c55e55":"#0f3460"}`, borderRadius:12, overflow:"hidden", cursor:"pointer" }}>
                <div style={{ position:"relative" }}>
                  <PartImg part={p} height={130} />
                  <div style={{ position:"absolute", top:7, right:7 }}>
                    <span style={{ background:p.color, borderRadius:4, padding:"1px 6px", fontSize:9, fontWeight:700, color:"#000" }}>{p.company}</span>
                  </div>
                  {p.tag.includes("⭐") && (
                    <div style={{ position:"absolute", top:7, left:7, background:"#fbbf24", borderRadius:4, padding:"1px 5px", fontSize:9, fontWeight:700, color:"#000" }}>⭐</div>
                  )}
                  <div style={{ position:"absolute", bottom:6, left:8, fontWeight:900, fontSize:16, color:p.color, direction:"ltr", textShadow:"0 2px 6px rgba(0,0,0,0.8)" }}>{p.score}</div>
                </div>
                <div style={{ padding:"9px 11px" }}>
                  <div style={{ fontSize:8, color:"#334155", marginBottom:1 }}>{p.series}</div>
                  <div style={{ fontWeight:800, fontSize:12, color:"#e2e8f0", marginBottom:2 }}>{p.name}</div>
                  <div style={{ fontSize:9, color:"#334155", marginBottom:6, lineHeight:1.4 }}>{p.specs}</div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontWeight:900, fontSize:13, color:p.color, direction:"ltr", display:"inline-block" }}>{p.priceSAR.toLocaleString()} ر.س</span>
                    <button onClick={e=>{ e.stopPropagation(); setBuild(prev=>({...prev,[p.type]:p.id})); }} style={{ background:build[p.type]===p.id?"#22c55e22":"#0f3460", border:`1px solid ${build[p.type]===p.id?"#22c55e":"#1e4080"}`, borderRadius:6, padding:"3px 8px", color:build[p.type]===p.id?"#22c55e":"#475569", cursor:"pointer", fontSize:10, fontWeight:700 }}>
                      {build[p.type]===p.id?"✅":"➕"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
 
      {/* MODAL */}
      {selected && (
        <div onClick={()=>setSelected(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#16213e", border:`1px solid ${selected.color}44`, borderRadius:20, maxWidth:480, width:"100%", maxHeight:"90vh", overflowY:"auto" }}>
            <div style={{ position:"relative", borderRadius:"20px 20px 0 0", overflow:"hidden" }}>
              <PartImg part={selected} height={200} />
              <button onClick={()=>setSelected(null)} style={{ position:"absolute", top:10, left:10, background:"rgba(0,0,0,0.7)", border:"none", borderRadius:7, padding:"5px 10px", color:"#fff", cursor:"pointer", fontSize:14 }}>✕</button>
              <div style={{ position:"absolute", top:10, right:10, display:"flex", flexDirection:"column", gap:4 }}>
                <span style={{ background:selected.color, borderRadius:5, padding:"2px 8px", fontSize:9, fontWeight:700, color:"#000" }}>{selected.type}</span>
                <span style={{ background:"rgba(0,0,0,0.6)", borderRadius:5, padding:"2px 8px", fontSize:9, color:"#fff" }}>{selected.company}</span>
              </div>
              <div style={{ position:"absolute", bottom:0, right:0, left:0, padding:"12px 14px" }}>
                <div style={{ fontWeight:900, fontSize:18, color:"#fff", textShadow:"0 2px 10px rgba(0,0,0,0.9)" }}>{selected.name}</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.6)", marginTop:2 }}>{selected.series}</div>
              </div>
            </div>
 
            <div style={{ padding:16 }}>
              <div style={{ background:"#0f1b2d", borderRadius:10, padding:"10px 14px", marginBottom:12, fontSize:11, color:"#94a3b8" }}>{selected.specs}</div>
 
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
                <div style={{ background:"#0f1b2d", borderRadius:10, padding:"10px", textAlign:"center" }}>
                  <div style={{ fontSize:9, color:"#475569", marginBottom:3 }}>السعر</div>
                  <div style={{ fontSize:18, fontWeight:900, color:selected.color, direction:"ltr" }}>{selected.priceSAR.toLocaleString()} ر.س</div>
                </div>
                <div style={{ background:"#0f1b2d", borderRadius:10, padding:"10px", textAlign:"center" }}>
                  <div style={{ fontSize:9, color:"#475569", marginBottom:3 }}>الأداء</div>
                  <div style={{ fontSize:18, fontWeight:900, color:selected.color }}>{selected.score}/100</div>
                </div>
              </div>
 
              <div style={{ background:`${selected.color}11`, border:`1px solid ${selected.color}33`, borderRadius:12, padding:12, marginBottom:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                  <span>🤖</span>
                  <span style={{ fontWeight:700, fontSize:12, color:"#e2e8f0" }}>تحليل الذكاء الاصطناعي</span>
                  {aiLoading && <span style={{ fontSize:9, color:selected.color }}>جاري التحليل...</span>}
                </div>
                {aiLoading ? (
                  <div style={{ display:"flex", gap:5 }}>
                    {[0,1,2].map(i=><div key={i} style={{ width:7,height:7,background:selected.color,borderRadius:"50%",animation:`bounce 1s ${i*0.2}s infinite` }}/>)}
                  </div>
                ) : (
                  <div style={{ fontSize:11, color:"#cbd5e1", lineHeight:1.9, whiteSpace:"pre-line" }}>{aiText}</div>
                )}
              </div>
 
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>{ setBuild(prev=>({...prev,[selected.type]:selected.id})); setSelected(null); }} style={{ flex:1, background:`linear-gradient(135deg,${selected.color},${selected.color}cc)`, border:"none", borderRadius:10, padding:"11px", color:"#000", fontWeight:800, cursor:"pointer", fontSize:13 }}>
                  {build[selected.type]===selected.id?"✅ في تجميعتك":"➕ أضف للتجميعة"}
                </button>
                <button onClick={()=>setSelected(null)} style={{ background:"#0f1b2d", border:"1px solid #1e4080", borderRadius:10, padding:"11px 14px", color:"#64748b", cursor:"pointer" }}>✕</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes bounce{0%,100%{transform:translateY(0);opacity:0.3}50%{transform:translateY(-6px);opacity:1}}`}</style>
    </div>
  );
}
