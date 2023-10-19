import "./sidebarLink.css";

function SidebarLink({ text, Icon , onClick}) {


  return(
    <div className="link" onClick={onClick}>
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}
export default SidebarLink;