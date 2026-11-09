import React,{useEffect,useState} from "react";
import{createRoot}from"react-dom/client";
import{createClient}from"@supabase/supabase-js";
import{Menu, X, LogIn, LogOut, MessageSquareWarning, Lightbulb, HardHat, Megaphone}from"lucide-react";
import"./style.css";
const supabase=import.meta.env.VITE_SUPABASE_URL&&import.meta.env.VITE_SUPABASE_ANON_KEY?createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_ANON_KEY):null;
function App(){
 const[session,setSession]=useState(null),[email,setEmail]=useState(""),[notice,setNotice]=useState(""),[tab,setTab]=useState("home"),[menu,setMenu]=useState(false),[works,setWorks]=useState([]),[news,setNews]=useState([]);
 useEffect(()=>{if(!supabase)return;supabase.auth.getSession().then(({data})=>setSession(data.session));const{data:{subscription}}=supabase.auth.onAuthStateChange((_,s)=>setSession(s));return()=>subscription.unsubscribe()},[]);
 useEffect(()=>{if(!supabase)return;supabase.from("development_works").select("*").order("created_at",{ascending:false}).then(({data})=>setWorks(data||[]));supabase.from("announcements").select("*").order("created_at",{ascending:false}).then(({data})=>setNews(data||[]))},[]);
 async function login(e){e.preventDefault();if(!supabase){setNotice("Supabase URL और Publishable Key अभी सेट नहीं हैं।");return}const{error}=await supabase.auth.signInWithOtp({email,options:{emailRedirectTo:location.origin}});setNotice(error?error.message:"ईमेल भेजने का अनुरोध किया गया है। Inbox और Spam देखें।")}
 const nav=[["home","मुख्य पृष्ठ"],["works","विकास कार्य"],["news","घोषणाएँ"],["login","Gmail Login"]];
 return <><header><div className="brand"><b>फोगां भारथरी</b><small>हमारा गाँव, हमारा विकास</small></div><button className="hamb" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button><nav className={menu?"show":""}>{nav.map(([k,v])=><button className={tab===k?"active":""} onClick={()=>{setTab(k);setMenu(false)}}>{v}</button>)}</nav>{session?<button className="login" onClick={()=>supabase.auth.signOut()}><LogOut size={16}/> लॉगआउट</button>:<button className="login" onClick={()=>setTab("login")}><LogIn size={16}/> लॉगिन</button>}</header>
 {notice&&<div className="notice" onClick={()=>setNotice("")}>{notice}　×</div>}
 {!supabase&&<div className="notice warn">वेबसाइट की Supabase configuration बाकी है।</div>}
 {tab==="home"&&<><section className="hero"><span>ग्राम पंचायत • सरदारशहर • राजस्थान</span><h1>हमारा गाँव,<br/><em>हमारा विकास</em></h1><p>गाँव की समस्याएँ, सुझाव और विकास कार्य — अब एक ही डिजिटल मंच पर।</p><button onClick={()=>setTab("login")}>Gmail से शुरू करें</button></section><section className="tiles"><article><MessageSquareWarning/><h3>शिकायत दर्ज करें</h3><p>गाँव की समस्या पंचायत तक पहुँचाएँ।</p></article><article><Lightbulb/><h3>सुझाव दें</h3><p>गाँव के विकास के लिए विचार साझा करें।</p></article><article><HardHat/><h3>विकास कार्य</h3><p>गाँव में चल रहे काम देखें।</p></article></section><section className="content"><h2>गाँव की घोषणाएँ</h2>{news.length?news.map(n=><article><Megaphone/><h3>{n.title}</h3><p>{n.body||n.description}</p></article>):<p>अभी कोई घोषणा उपलब्ध नहीं है।</p>}</section></>}
 {tab==="login"&&<section className="loginbox"><h2>Gmail से लॉगिन करें</h2><p>अपना ईमेल लिखें। लॉगिन लिंक ईमेल पर भेजा जाएगा।</p><form onSubmit={login}><input type="email" required placeholder="name@gmail.com" value={email} onChange={e=>setEmail(e.target.value)}/><button>लॉगिन लिंक भेजें</button></form><small>नोट: सार्वजनिक Gmail login के लिए Supabase में custom SMTP सेट करना आवश्यक हो सकता है।</small></section>}
 {tab==="works"&&<section className="content"><h2>गाँव के विकास कार्य</h2>{works.length?works.map(w=><article><HardHat/><h3>{w.title}</h3><p>{w.description||w.details}</p><small>{w.location||w.area||""}　{w.status||""}</small></article>):<p>अभी विकास कार्यों की जानकारी उपलब्ध नहीं है।</p>}</section>}
 {tab==="news"&&<section className="content"><h2>घोषणाएँ</h2>{news.map(n=><article><h3>{n.title}</h3><p>{n.body||n.description}</p></article>)}</section>}
 <footer><b>फोगां भारथरी – हमारा गाँव, हमारा विकास</b><p>ग्राम पंचायत फोगां भारथरी • सरदारशहर, राजस्थान</p></footer></>
}
createRoot(document.getElementById("root")).render(<App/>);