const search = document.querySelector(".search") as Element;
const input = document.querySelector("input") as HTMLInputElement;
const listMenu = document.querySelector(".list-menu") as Element;
const del = document.querySelector(".del") as Element;

// debouncing
const debounce = <T extends (...args: any) => any>(
  callback: T,
  delay = 500
) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(...args);
      clearTimeout(timeout);
    }, delay);
  };
};

// 검색 api
const textApi = async (search: string) => {
  const res = await fetch(
    `https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=${search}`
  ).then((res) => res.json());

  return res;
};

// 검색 결과
const onSearch = async (e: { target: HTMLInputElement }): Promise<void> => {
  if (e.target.value === "") {
    del.classList.add("list-menu");
  } else {
    del.classList.remove("list-menu");
  }

  const text = await textApi(e.target.value);

  if (text.length === 0) {
    listMenu.classList.remove("show");
    return;
  }

  listMenu.classList.add("show");
  listMenu.addEventListener("mouseenter", () => {
    if (input.value) {
      listMenu.classList.add("show");
    }
  });
  listMenu.addEventListener("mouseleave", () => {
    listMenu.classList.remove("show");
  });
  listMenu.innerHTML = "";

  listTemplate(text);
};

// 검색 리스트
const listTemplate = (list: []) => {
  for (const item of list) {
    const { text } = item;

    const li = document.createElement("option");
    li.classList.add("list-item");
    li.innerHTML = `<span>${text}</span>`;

    li.addEventListener("mouseenter", () => {
      li.classList.add("focus");
    });
    li.addEventListener("mouseleave", () => {
      li.classList.remove("focus");
    });

    listMenu.appendChild(li);
  }

  const listItems: any = document.querySelectorAll(".list-item");
  listItems[i].classList.add("focus");
};

// input focus 관련 event
input.addEventListener("input", debounce(onSearch));
search.addEventListener("mouseleave", () => {
  listMenu.classList.remove("show");
});
search.addEventListener("mouseenter", () => {
  const item = document.querySelector(".list-item");
  if (item && input.value) {
    listMenu.classList.add("show");
  }
});

// keydown 관련 event
let i = 0;
window.addEventListener("keydown", (event) => {
  const listItems: any = document.querySelectorAll(".list-item");

  if (event.isComposing) {
    return;
  }

  if (event.code === "ArrowDown") {
    i += 1;
    for (let item of listItems) {
      item.classList.remove("focus");
      listItems[Math.abs(i) % listItems.length].classList.add("focus");
    }
  }

  if (event.code === "ArrowUp") {
    i -= 1;
    for (let item of listItems) {
      item.classList.remove("focus");
      listItems[Math.abs(i) % listItems.length].classList.add("focus");
    }

    if (i - 1 < 0) {
      i = listItems.length;
    }
  }

  return;
});

del.addEventListener("click", () => {
  input.value = "";
  listMenu.classList.remove("show");
  del.classList.add("list-menu");
});

window.onload = () => {
  del.classList.add("list-menu");
};
