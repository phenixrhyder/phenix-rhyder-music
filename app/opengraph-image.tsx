import { ImageResponse } from 'next/og';
export const alt = 'Phenix Rhyder — independent music, Phenix Records';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(<div style={{ width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',padding:'70px',background:'radial-gradient(ellipse at 85% 45%, #3c315c, #08090e 70%)',color:'#f0f0f3',fontFamily:'sans-serif' }}><div style={{fontSize:15,letterSpacing:5,color:'#bca9ec',display:'flex'}}>OFFICIAL ARTIST WEBSITE</div><div style={{fontSize:140,lineHeight:0.95,letterSpacing:-8,marginTop:35,display:'flex'}}>PHENIX</div><div style={{fontSize:140,lineHeight:0.95,letterSpacing:-8,display:'flex'}}>RHYDER.</div><div style={{fontSize:19,marginTop:35,display:'flex',color:'#bcb5ca'}}>Sound beyond the familiar. / PHENIX RECORDS</div></div>,size);
}
