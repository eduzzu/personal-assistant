 
 export default function ChatHeader() {
    return (
        <div className="flex items-center gap-2.5 border-t-0 border-b-2 border-b-gray-300 pt-0 pb-2 pr-3 pl-3"
    >
      <img
        src={`/personal-assistant-logo.png`}
        alt={`Personal-Assistant profile picture`}
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          border: "1px solid black",
          objectFit: "cover",
        }}
      />
      <h2>Personal-Assistant</h2>
    </div>
    )
 }
 
 