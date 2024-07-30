document.addEventListener("DOMContentLoaded", () => {
  const ulElement = document.querySelector(
    "ul.flex.items-center.justify-start",
  );

  const newItems = [
    {
      name: "Alice Johnson",
      image: "https://i.ibb.co/RB7MNvp/pexels-ekaterina-bolovtsova-5393594.jpg",
    },
    {
      name: "Bob Smith",
      image: "https://i.ibb.co/j4kLSD4/pexels-gabby-k-5384445.jpg",
    },
    {
      name: "Charlie Brown",
      image: "https://i.ibb.co/BNY24kN/pexels-amirvisuals-6274712.jpg",
    },
    {
      name: "Diana Prince",
      image: "https://i.ibb.co/JFqpmxg/pexels-dziana-hasanbekava-7275385.jpg",
    },
    {
      name: "Edward Elric",
      image: "https://i.ibb.co/3m91vX4/pexels-cottonbro-5378700.jpg",
    },
  ];

  function createListItem(name, image) {
    const li = document.createElement("li");
    li.className =
      "inline-flex flex-col justify-center text-center items-center w-16";

    li.innerHTML = `
      <img
        src="${image}"
        alt="${name}"
        class="w-12 h-12 rounded-full m-0 object-cover"
      />
      <span class="text-xs px-1 font-semibold truncate w-full">${name}</span>
    `;

    return li;
  }

  newItems.forEach((item) => {
    const newListItem = createListItem(item.name, item.image);
    ulElement.appendChild(newListItem);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const conversations = [
    {
      name: "Maria Houk",
      message: "You: Sounds good. See you tomorrow!",
      time: "12:32",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      online: true,
    },
    {
      name: "Robert Fleishman",
      message: "Thank you much",
      time: "09:32",
      image: "https://i.ibb.co/BNY24kN/pexels-amirvisuals-6274712.jpg",
      online: true,
    },
    {
      name: "Edward Elric",
      message: "I'm on my way",
      time: "08:32",
      image: "https://i.ibb.co/3m91vX4/pexels-cottonbro-5378700.jpg",
      online: false,
    },
    {
      name: "Diana Prince",
      message: "I'm on my way too",
      time: "07:32",
      image: "https://i.ibb.co/JFqpmxg/pexels-dziana-hasanbekava-7275385.jpg",
      online: false,
    },
    {
      name: "Charlie Brown",
      message: "Did you hear about the meeting tomorrow?",
      time: "06:32",
      image: "https://i.ibb.co/WgWrtR5/pexels-laker-5792641.jpg",
      online: false,
    },
    {
      name: "Bob Smith",
      message: "Hey, have you heard about the meeting tomorrow?",
      time: "05:32",
      image: "https://i.ibb.co/j4kLSD4/pexels-gabby-k-5384445.jpg",
      online: false,
    },
    {
      name: "Alice Johnson",
      message: "Yeah, I got the reminder. What time is it again?",
      time: "04:32",
      image: "https://i.ibb.co/RB7MNvp/pexels-ekaterina-bolovtsova-5393594.jpg",
      online: false,
    },
  ];

  const conversationList = document.getElementById("conversation-list");

  conversations.forEach((conv, index) => {
    const li = document.createElement("li");
    li.className = "p-4 flex items-center cursor-";
    li.setAttribute("data-index", index);
    const onlineIndicator = document.createElement("div");
    onlineIndicator.className =
      "absolute top-[2.1rem] left-9 w-3 h-3 border border-white rounded-full bg-green-500 z-10";
    onlineIndicator.style.display = conv.online ? "block" : "none";
    li.appendChild(onlineIndicator);

    li.innerHTML = `
    <div class="relative">
   ${onlineIndicator.outerHTML}
      <img src="${conv.image}" alt="${conv.name}" class="w-12 h-12 rounded-full mr-4 object-cover" />
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold">${conv.name}</h3>
        <p class="text-gray-500 text-wrap">${conv.message}</p>
      </div>
      <span class="text-gray-400 text-sm">${conv.time}</span>
    `;
    conversationList.appendChild(li);
  });

  function updateChatWindow(image, name, messages) {
    document.getElementById("chat-image").src = image;
    document.getElementById("chat-image").alt = name;
    document.getElementById("chat-name").innerText = name;

    const chatWindow = document.getElementById("chat-window");
    chatWindow.innerHTML = "";

    messages.forEach((message) => {
      const messageElement = document.createElement("div");
      messageElement.className = `flex items-start mb-4 ${message.sentByMe ? "justify-end" : ""}`;

      const imageHTML = message.sentByMe
        ? ""
        : `
        <div class="relative">
        <div class="absolute top-14 left-6 w-2 h-2 border border-white rounded-full bg-green-500 z-10"></div>
          <img class="w-8 h-8 rounded-full mt-8 mr-2" src="${message.image}" alt="${message.name}" />
          </div>
        `;

      const timeElement = document.createElement("span");
      timeElement.className = "text-gray-400 text-sm";
      timeElement.innerText = message.time;

      const messageContent = document.createElement("div");
      messageContent.className = `${message.sentByMe ? "bg-orange-400 text-white ml-auto" : "bg-gray-200"} p-3 rounded-lg max-w-[200px]`;

      const messageText = document.createElement("p");
      messageText.innerText = message.text;
      messageContent.appendChild(messageText);

      const textWrapper = document.createElement("div");
      textWrapper.className = "text-start";
      textWrapper.appendChild(timeElement);
      textWrapper.appendChild(messageContent);

      messageElement.innerHTML = imageHTML;
      messageElement.appendChild(textWrapper);

      chatWindow.appendChild(messageElement);
    });

    document.getElementById("chat-container").classList.remove("hidden-chat");
    document
      .getElementById("conversation-list-container")
      .classList.add("hidden");
  }

  document.querySelectorAll("#conversation-list li").forEach((item) => {
    item.addEventListener("click", () => {
      const index = item.getAttribute("data-index");
      const conv = conversations[index];
      const senderImage = conv.image;

      const messages = [
        {
          text: "Hey, have you heard about the meeting tomorrow?",
          time: "12:29",
          sentByMe: false,
          image: senderImage,
        },
        {
          text: "Yeah, I got the reminder. What time is it again?",
          time: "12:30",
          sentByMe: true,
        },
        {
          text: "I think it's at 10 in the morning. Are you coming?",
          time: "12:31",
          sentByMe: false,
          image: senderImage,
        },
        {
          text: "Absolutely, wouldn't miss it. Is it at the usual place?",
          time: "12:32",
          sentByMe: true,
        },
        {
          text: "Yeah, same place as last time. See you there!",
          time: "12:32",
          sentByMe: false,
          image: senderImage,
        },
      ];

      updateChatWindow(conv.image, conv.name, messages);
    });
  });

  document.getElementById("back-button").addEventListener("click", () => {
    document.getElementById("chat-container").classList.add("hidden-chat");
    document
      .getElementById("conversation-list-container")
      .classList.remove("hidden");
  });
});
