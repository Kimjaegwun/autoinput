var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var search = document.querySelector(".search");
var input = document.querySelector("input");
var listMenu = document.querySelector(".list-menu");
var del = document.querySelector(".del");
// debouncing
var debounce = function (callback, delay) {
    if (delay === void 0) { delay = 500; }
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(function () {
            callback.apply(void 0, args);
            clearTimeout(timeout);
        }, delay);
    };
};
// 검색 api
var textApi = function (search) { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=" + search).then(function (res) { return res.json(); })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
// 검색 결과
var onSearch = function (e) { return __awaiter(_this, void 0, void 0, function () {
    var text;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (e.target.value === "") {
                    del.classList.add("list-menu");
                }
                else {
                    del.classList.remove("list-menu");
                }
                return [4 /*yield*/, textApi(e.target.value)];
            case 1:
                text = _a.sent();
                if (text.length === 0) {
                    listMenu.classList.remove("show");
                    return [2 /*return*/];
                }
                listMenu.classList.add("show");
                listMenu.addEventListener("mouseenter", function () {
                    if (input.value) {
                        listMenu.classList.add("show");
                    }
                });
                listMenu.addEventListener("mouseleave", function () {
                    listMenu.classList.remove("show");
                });
                listMenu.innerHTML = "";
                listTemplate(text);
                return [2 /*return*/];
        }
    });
}); };
// 검색 리스트
var listTemplate = function (list) {
    var _loop_1 = function (item) {
        var text = item.text;
        var li = document.createElement("option");
        li.classList.add("list-item");
        li.innerHTML = "<span>" + text + "</span>";
        li.addEventListener("mouseenter", function () {
            li.classList.add("focus");
        });
        li.addEventListener("mouseleave", function () {
            li.classList.remove("focus");
        });
        listMenu.appendChild(li);
    };
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var item = list_1[_i];
        _loop_1(item);
    }
    var listItems = document.querySelectorAll(".list-item");
    listItems[i].classList.add("focus");
};
// input focus 관련 event
input.addEventListener("input", debounce(onSearch));
search.addEventListener("mouseleave", function () {
    listMenu.classList.remove("show");
});
search.addEventListener("mouseenter", function () {
    var item = document.querySelector(".list-item");
    if (item && input.value) {
        listMenu.classList.add("show");
    }
});
// keydown 관련 event
var i = 0;
window.addEventListener("keydown", function (event) {
    var listItems = document.querySelectorAll(".list-item");
    if (event.isComposing) {
        return;
    }
    if (event.code === "ArrowDown") {
        i += 1;
        for (var _i = 0, listItems_1 = listItems; _i < listItems_1.length; _i++) {
            var item = listItems_1[_i];
            item.classList.remove("focus");
            listItems[Math.abs(i) % listItems.length].classList.add("focus");
        }
    }
    if (event.code === "ArrowUp") {
        i -= 1;
        for (var _a = 0, listItems_2 = listItems; _a < listItems_2.length; _a++) {
            var item = listItems_2[_a];
            item.classList.remove("focus");
            listItems[Math.abs(i) % listItems.length].classList.add("focus");
        }
        if (i - 1 < 0) {
            i = listItems.length;
        }
    }
    return;
});
del.addEventListener("click", function () {
    input.value = "";
    listMenu.classList.remove("show");
    del.classList.add("list-menu");
});
window.onload = function () {
    del.classList.add("list-menu");
};
