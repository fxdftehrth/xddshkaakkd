const pageToast = document.querySelector("#page-toast");

function showPageToast(message) {
  if (!pageToast) return;
  pageToast.textContent = message;
  pageToast.classList.add("visible");
  window.clearTimeout(showPageToast.timeout);
  showPageToast.timeout = window.setTimeout(() => pageToast.classList.remove("visible"), 3200);
}

const offerCards = document.querySelectorAll("[data-offer]");
const offerName = document.querySelector("#offer-name");
const offerCopy = document.querySelector("#offer-copy");
const offerLabel = document.querySelector("#offer-label");
const offerAction = document.querySelector("#offer-action");
const offerPanel = document.querySelector("#offer-panel");

const offerContent = {
  betboom: { name: "BETBOOM", tone: "Карточка 01 / 12", copy: "Витринная карточка BETBOOM. До публикации перехода добавьте актуальные условия, возрастные ограничения и ссылку от официального партнёрского кабинета." },
  fonbet: { name: "FONBET", tone: "Карточка 02 / 12", copy: "Витринная карточка FONBET. До публикации перехода добавьте актуальные условия, возрастные ограничения и ссылку от официального партнёрского кабинета." },
  winline: { name: "Winline", tone: "Карточка 03 / 12", copy: "Витринная карточка Winline. До публикации перехода добавьте актуальные условия, возрастные ограничения и ссылку от официального партнёрского кабинета." },
  pari: { name: "PARI", tone: "Карточка 04 / 12", copy: "Витринная карточка PARI. До публикации перехода добавьте актуальные условия, возрастные ограничения и ссылку от официального партнёрского кабинета." },
  betcity: { name: "БЕТСИТИ", tone: "Карточка 05 / 12", copy: "Витринная карточка БЕТСИТИ. До публикации перехода добавьте актуальные условия, возрастные ограничения и ссылку от официального партнёрского кабинета." },
  leon: { name: "LEON", tone: "Карточка 06 / 12", copy: "Витринная карточка LEON. До публикации перехода добавьте актуальные условия, возрастные ограничения и ссылку от официального партнёрского кабинета." },
  marathonbet: { name: "MARATHONBET", tone: "Карточка 07 / 12", copy: "Витринная карточка MARATHONBET. До публикации перехода добавьте актуальные условия, возрастные ограничения и ссылку от официального партнёрского кабинета." },
  ligastavok: { name: "ЛИГА СТАВОК", tone: "Карточка 08 / 12", copy: "Витринная карточка ЛИГА СТАВОК. До публикации перехода добавьте актуальные условия, возрастные ограничения и ссылку от официального партнёрского кабинета." },
  bettery: { name: "BETTERY", tone: "Карточка 09 / 12", copy: "Витринная карточка BETTERY. До публикации перехода добавьте актуальные условия, возрастные ограничения и ссылку от официального партнёрского кабинета." },
  olimpbet: { name: "OLIMPBET", tone: "Карточка 10 / 12", copy: "Витринная карточка OLIMPBET. До публикации перехода добавьте актуальные условия, возрастные ограничения и ссылку от официального партнёрского кабинета." },
  zenitbet: { name: "ZENITBET", tone: "Карточка 11 / 12", copy: "Витринная карточка ZENITBET. До публикации перехода добавьте актуальные условия, возрастные ограничения и ссылку от официального партнёрского кабинета." },
  baltbet: { name: "БАЛТБЕТ", tone: "Карточка 12 / 12", copy: "Витринная карточка БАЛТБЕТ. До публикации перехода добавьте актуальные условия, возрастные ограничения и ссылку от официального партнёрского кабинета." }
};

offerCards.forEach((card) => {
  card.addEventListener("click", () => {
    const data = offerContent[card.dataset.offer];
    if (!data || !offerName || !offerCopy || !offerLabel || !offerAction || !offerPanel) return;
    offerCards.forEach((item) => {
      const selected = item === card;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    offerName.textContent = data.name;
    offerCopy.textContent = data.copy;
    offerLabel.textContent = data.tone;
    offerAction.disabled = true;
    offerAction.innerHTML = `Ссылка ${data.name} не подключена <span>↗</span>`;
    offerPanel.classList.add("is-ready");
  });
});

const matchFilters = document.querySelectorAll("[data-match-filter]");
const matchList = document.querySelector("#match-list");
const matchStatus = document.querySelector("#match-status");
const matchRefresh = document.querySelector("#match-refresh");
const matchSourceState = document.querySelector("#match-source-state");
const scoreboardLabel = document.querySelector("#scoreboard-label");
const scoreboardHour = document.querySelector("#scoreboard-hour");
const scoreboardMinute = document.querySelector("#scoreboard-minute");
const scoreboardHome = document.querySelector("#scoreboard-home");
const scoreboardAway = document.querySelector("#scoreboard-away");
const scoreboardDivider = document.querySelector("#scoreboard-divider");
const scoreboardSport = document.querySelector("#scoreboard-sport");
const scoreboardDay = document.querySelector("#scoreboard-day");

const scheduleSports = [
  { key: "football", providerName: "Soccer", label: "Футбол", icon: "⚽" },
  { key: "hockey", providerName: "Ice_Hockey", label: "Хоккей", icon: "✦" },
  { key: "tennis", providerName: "Tennis", label: "Теннис", icon: "◌" },
  { key: "esports", providerName: "Esports", label: "Киберспорт", icon: "⌘" }
];

const scheduleSportsByKey = Object.fromEntries(scheduleSports.map((sport) => [sport.key, sport]));
const russianLeagues = [
  { id: "4355", sport: "football", label: "РПЛ" },
  { id: "5193", sport: "football", label: "Кубок России" },
  { id: "4920", sport: "hockey", label: "КХЛ" },
  { id: "4919", sport: "hockey", label: "ВХЛ" }
];
const russianLeaguesById = Object.fromEntries(russianLeagues.map((league) => [league.id, league]));
const sportsApiBase = "https://www.thesportsdb.com/api/v1/json/123";
const samaraTimeZone = "Europe/Samara";
const cacheKey = "pole-match-schedule-v2";
const freshCacheLifetime = 10 * 60 * 1000;
const staleCacheLifetime = 2 * 60 * 60 * 1000;
const refreshInterval = 10 * 60 * 1000;
const requestTimeout = 12 * 1000;
const manualRefreshCooldown = 60 * 1000;

const samaraDatePartsFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: samaraTimeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});
const samaraDayFormatter = new Intl.DateTimeFormat("ru-RU", {
  timeZone: samaraTimeZone,
  weekday: "long",
  day: "numeric",
  month: "short"
});
const samaraTimeFormatter = new Intl.DateTimeFormat("ru-RU", {
  timeZone: samaraTimeZone,
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
const samaraUpdatedFormatter = new Intl.DateTimeFormat("ru-RU", {
  timeZone: samaraTimeZone,
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});

let activeMatchSport = "all";
let matches = [];
let refreshTimer;
let lastRequestAt = 0;
const savedMatchIds = new Set();
let scheduleState = {
  loading: false,
  hasLoaded: false,
  source: "none",
  fetchedAt: null,
  partial: false,
  error: false
};

function getDateParts(formatter, date) {
  return formatter.formatToParts(date).reduce((parts, part) => {
    if (part.type !== "literal") parts[part.type] = part.value;
    return parts;
  }, {});
}

function getSamaraDateKey(date = new Date()) {
  const parts = getDateParts(samaraDatePartsFormatter, date);
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function getScheduleDateKeys() {
  const firstDay = new Date(`${getSamaraDateKey()}T12:00:00Z`);
  return Array.from({ length: 3 }, (_, index) => {
    const nextDay = new Date(firstDay);
    nextDay.setUTCDate(firstDay.getUTCDate() + index);
    return nextDay.toISOString().slice(0, 10);
  });
}

function cleanText(value, maximumLength = 120) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maximumLength);
}

function parseEventTime(event) {
  const timestamp = cleanText(event.strTimestamp, 40);
  if (timestamp) {
    const timestampWithZone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(timestamp) ? timestamp : `${timestamp}Z`;
    const parsedTimestamp = new Date(timestampWithZone);
    if (!Number.isNaN(parsedTimestamp.getTime())) return parsedTimestamp;
  }

  const date = cleanText(event.dateEvent, 10);
  const time = cleanText(event.strTime, 8);
  if (/^\d{4}-\d{2}-\d{2}$/.test(date) && /^\d{2}:\d{2}(?::\d{2})?$/.test(time)) {
    const parsedDate = new Date(`${date}T${time}Z`);
    if (!Number.isNaN(parsedDate.getTime())) return parsedDate;
  }

  return null;
}

function getEventTeams(event) {
  const home = cleanText(event.strHomeTeam, 80);
  const away = cleanText(event.strAwayTeam, 80);
  if (home && away) return { home, away };

  const eventName = cleanText(event.strEvent, 160);
  const pair = eventName.split(/\s+(?:vs?\.?|—)\s+/i);
  if (pair.length > 1) {
    return { home: cleanText(pair[0], 80), away: cleanText(pair.slice(1).join(" vs "), 80) };
  }

  return { home: eventName, away: "" };
}

function normalizeEvent(event, sport, russianLeague = null) {
  const eventTime = parseEventTime(event);
  const teams = getEventTeams(event);
  if (!eventTime || !teams.home) return null;

  const startsAt = eventTime.getTime();
  const providerLeagueId = cleanText(event.idLeague, 20);
  const matchedRussianLeague = russianLeague || russianLeaguesById[providerLeagueId] || null;
  return {
    id: cleanText(event.idEvent, 80) || `${sport.key}-${startsAt}-${teams.home}-${teams.away}`,
    sport: sport.key,
    league: cleanText(matchedRussianLeague?.label || event.strLeague, 90),
    leagueId: providerLeagueId || matchedRussianLeague?.id || "",
    isRussian: Boolean(matchedRussianLeague),
    home: teams.home,
    away: teams.away,
    startsAt
  };
}

function isUpcoming(match) {
  return Number.isFinite(match?.startsAt) && match.startsAt >= Date.now();
}

function sanitizeCachedMatch(match) {
  if (!match || typeof match !== "object" || !scheduleSportsByKey[match.sport]) return null;
  const startsAt = Number(match.startsAt);
  const home = cleanText(match.home, 80);
  if (!Number.isFinite(startsAt) || !home) return null;

  return {
    id: cleanText(match.id, 160) || `${match.sport}-${startsAt}-${home}`,
    sport: match.sport,
    league: cleanText(match.league, 90),
    leagueId: cleanText(match.leagueId, 20),
    isRussian: Boolean(match.isRussian) || Boolean(russianLeaguesById[cleanText(match.leagueId, 20)]),
    home,
    away: cleanText(match.away, 80),
    startsAt
  };
}

function sortAndDeduplicate(rawMatches) {
  const uniqueMatches = new Map();
  rawMatches.forEach((match) => {
    if (match && !uniqueMatches.has(match.id)) uniqueMatches.set(match.id, match);
  });

  return Array.from(uniqueMatches.values())
    .filter(isUpcoming)
    .sort((first, second) => first.startsAt - second.startsAt || first.id.localeCompare(second.id));
}

function readCachedSchedule() {
  try {
    const cachedValue = localStorage.getItem(cacheKey);
    if (!cachedValue) return null;
    const cachedSchedule = JSON.parse(cachedValue);
    const fetchedAt = new Date(cachedSchedule.fetchedAt);
    const age = Date.now() - fetchedAt.getTime();
    if (!Array.isArray(cachedSchedule.events) || Number.isNaN(fetchedAt.getTime()) || age < 0 || age > staleCacheLifetime) return null;

    return {
      events: sortAndDeduplicate(cachedSchedule.events.map(sanitizeCachedMatch)),
      fetchedAt,
      age
    };
  } catch {
    return null;
  }
}

function writeCachedSchedule(events, fetchedAt) {
  try {
    localStorage.setItem(cacheKey, JSON.stringify({ fetchedAt: fetchedAt.toISOString(), events }));
  } catch {
    // The page remains usable when browser storage is unavailable.
  }
}

async function fetchEventsForDay(sport, date) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), requestTimeout);
  const url = new URL(`${sportsApiBase}/eventsday.php`);
  url.search = new URLSearchParams({ d: date, s: sport.providerName }).toString();

  try {
    const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
    if (!response.ok) throw new Error(`Schedule request failed with ${response.status}`);
    const payload = await response.json();
    return Array.isArray(payload.events) ? payload.events : [];
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function fetchNextLeagueEvents(league) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), requestTimeout);
  const url = new URL(`${sportsApiBase}/eventsnextleague.php`);
  url.search = new URLSearchParams({ id: league.id }).toString();

  try {
    const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
    if (!response.ok) throw new Error(`Russian league request failed with ${response.status}`);
    const payload = await response.json();
    return Array.isArray(payload.events) ? payload.events : [];
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function getVisibleMatches() {
  return matches.filter((match) => {
    if (!isUpcoming(match) || activeMatchSport === "all") return isUpcoming(match);
    if (activeMatchSport === "russia") return Boolean(match.isRussian);
    return match.sport === activeMatchSport;
  });
}

function getScheduleDayLabel(match) {
  const eventDate = new Date(match.startsAt);
  const eventDateKey = getSamaraDateKey(eventDate);
  const [today, tomorrow] = getScheduleDateKeys();
  if (eventDateKey === today) return "СЕГОДНЯ";
  if (eventDateKey === tomorrow) return "ЗАВТРА";
  return samaraDayFormatter.format(eventDate).toLocaleUpperCase("ru-RU");
}

function getTimeParts(match) {
  return getDateParts(samaraTimeFormatter, new Date(match.startsAt));
}

function formatUpdatedAt(date) {
  return samaraUpdatedFormatter.format(date).toLocaleUpperCase("ru-RU");
}

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = text;
  return element;
}

function createMatchCard(match) {
  const sport = scheduleSportsByKey[match.sport];
  const timeParts = getTimeParts(match);
  const card = document.createElement("article");
  card.className = "match-card";
  card.dataset.match = match.sport;
  card.classList.toggle("match-card--russia", match.isRussian);
  if (match.isRussian) card.dataset.country = "russia";

  const date = document.createElement("div");
  date.className = "match-card__date";
  date.append(createTextElement("b", "", getScheduleDayLabel(match)), createTextElement("span", "", `${timeParts.hour}:${timeParts.minute}`));

  const sportInfo = document.createElement("div");
  sportInfo.className = "match-card__sport";
  const sportLabel = [sport.label, match.league, match.isRussian ? "Россия" : ""].filter(Boolean).join(" · ");
  sportInfo.append(createTextElement("i", "", sport.icon), createTextElement("span", "", sportLabel));

  const teams = document.createElement("div");
  teams.className = "match-card__teams";
  teams.append(createTextElement("strong", "", match.home));
  if (match.away) {
    teams.append(createTextElement("em", "", "—"), createTextElement("strong", "", match.away));
  }

  const reminder = document.createElement("button");
  reminder.className = "match-card__reminder";
  reminder.type = "button";
  reminder.dataset.reminder = "";
  reminder.dataset.eventId = match.id;
  const isSaved = savedMatchIds.has(match.id);
  reminder.classList.toggle("is-saved", isSaved);
  reminder.textContent = isSaved ? "Напоминание отмечено ✓" : "Отметить";

  card.append(date, sportInfo, teams, reminder);
  return card;
}

function createMatchState(message) {
  return createTextElement("p", "match-state", message);
}

function renderScoreboard(nextMatch) {
  if (!scoreboardLabel || !scoreboardHour || !scoreboardMinute || !scoreboardHome || !scoreboardAway || !scoreboardDivider || !scoreboardSport || !scoreboardDay) return;

  if (nextMatch) {
    const sport = scheduleSportsByKey[nextMatch.sport];
    const timeParts = getTimeParts(nextMatch);
    scoreboardLabel.textContent = "БЛИЖАЙШИЙ МАТЧ";
    scoreboardHour.textContent = timeParts.hour;
    scoreboardMinute.textContent = timeParts.minute;
    scoreboardHome.textContent = nextMatch.home;
    scoreboardAway.textContent = nextMatch.away;
    scoreboardAway.hidden = !nextMatch.away;
    scoreboardDivider.hidden = !nextMatch.away;
    scoreboardSport.textContent = `${sport.label}${nextMatch.isRussian ? " · Россия" : ""}`.toLocaleUpperCase("ru-RU");
    scoreboardDay.textContent = `${getScheduleDayLabel(nextMatch)} · САМАРА`;
    return;
  }

  scoreboardLabel.textContent = scheduleState.loading ? "SCHEDULE / ЗАГРУЗКА" : "SCHEDULE / НЕТ СОБЫТИЙ";
  scoreboardHour.textContent = "--";
  scoreboardMinute.textContent = "--";
  scoreboardHome.textContent = scheduleState.loading ? "Загрузка" : "Матчи не найдены";
  scoreboardAway.textContent = "";
  scoreboardAway.hidden = true;
  scoreboardDivider.hidden = true;
  scoreboardSport.textContent = "РАСПИСАНИЕ";
  scoreboardDay.textContent = "САМАРА";
}

function renderStatus(visibleMatches, allUpcomingMatches) {
  if (!matchStatus || !matchSourceState) return;

  if (scheduleState.loading && !scheduleState.hasLoaded) {
    matchStatus.textContent = "ЗАГРУЖАЕМ АКТУАЛЬНУЮ АФИШУ";
    matchSourceState.textContent = "Получаем данные расписания.";
    return;
  }

  if (scheduleState.loading) {
    matchStatus.textContent = `ОБНОВЛЯЕМ РАСПИСАНИЕ · СОБЫТИЙ: ${visibleMatches.length}`;
    matchSourceState.textContent = "Показываем последнюю полученную версию, пока идёт обновление.";
    return;
  }

  if (scheduleState.error && !scheduleState.hasLoaded) {
    matchStatus.textContent = "РАСПИСАНИЕ ВРЕМЕННО НЕДОСТУПНО";
    matchSourceState.textContent = "Не удалось связаться с источником расписания.";
    return;
  }

  if (!visibleMatches.length) {
    matchStatus.textContent = activeMatchSport === "all" && !allUpcomingMatches.length
      ? "НА БЛИЖАЙШИЕ 3 ДНЯ СОБЫТИЙ НЕ НАЙДЕНО"
      : activeMatchSport === "russia"
        ? "БЛИЖАЙШИХ РОССИЙСКИХ МАТЧЕЙ НЕ НАЙДЕНО"
      : "ПО ВЫБРАННОМУ ВИДУ СПОРТА СОБЫТИЙ НЕ НАЙДЕНО";
  } else if (scheduleState.source === "cache-fallback") {
    matchStatus.textContent = `СОХРАНЁННАЯ АФИША · СОБЫТИЙ: ${visibleMatches.length}`;
  } else {
    matchStatus.textContent = `ПОКАЗАНО СОБЫТИЙ: ${visibleMatches.length} · ОБНОВЛЕНО ${formatUpdatedAt(scheduleState.fetchedAt)}`;
  }

  if (scheduleState.source === "cache-fallback") {
    matchSourceState.textContent = `Источник временно недоступен: показана сохранённая версия от ${formatUpdatedAt(scheduleState.fetchedAt)}.`;
  } else if (scheduleState.source === "cache") {
    matchSourceState.textContent = `Показана сохранённая версия от ${formatUpdatedAt(scheduleState.fetchedAt)}.`;
  } else if (scheduleState.partial) {
    matchSourceState.textContent = "Часть спортивных разделов временно недоступна; остальные данные обновлены.";
  } else {
    matchSourceState.textContent = `Расписание обновлено ${formatUpdatedAt(scheduleState.fetchedAt)}.`;
  }
}

function renderMatchCenter() {
  if (!matchList) return;
  const allUpcomingMatches = matches.filter(isUpcoming);
  const visibleMatches = getVisibleMatches();
  matchList.setAttribute("aria-busy", String(scheduleState.loading));
  matchList.replaceChildren();

  if (scheduleState.loading && !scheduleState.hasLoaded) {
    matchList.append(createMatchState("Загружаем ближайшие события…"));
  } else if (!visibleMatches.length) {
    const message = scheduleState.error && !scheduleState.hasLoaded
      ? "Не удалось получить расписание. Попробуйте обновить страницу немного позже."
      : activeMatchSport === "all" && !allUpcomingMatches.length
        ? "В открытом расписании на ближайшие три дня пока нет событий."
        : activeMatchSport === "russia"
          ? "В открытом расписании российских турниров пока нет ближайших событий."
          : "В открытом расписании пока нет событий по выбранному виду спорта.";
    matchList.append(createMatchState(message));
  } else {
    visibleMatches.forEach((match) => matchList.append(createMatchCard(match)));
  }

  renderStatus(visibleMatches, allUpcomingMatches);
  renderScoreboard(allUpcomingMatches[0]);
}

function updateRefreshButton() {
  if (!matchRefresh) return;
  matchRefresh.disabled = scheduleState.loading;
  matchRefresh.textContent = scheduleState.loading ? "Обновляем…" : "Обновить";
}

function scheduleNextRefresh(delay = refreshInterval) {
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => refreshSchedule(), Math.max(0, delay));
}

async function refreshSchedule({ manual = false } = {}) {
  if (!matchList || scheduleState.loading) return;

  const now = Date.now();
  if (manual && now - lastRequestAt < manualRefreshCooldown) {
    const secondsLeft = Math.ceil((manualRefreshCooldown - (now - lastRequestAt)) / 1000);
    showPageToast(`Повторное обновление будет доступно через ${secondsLeft} с.`);
    return;
  }

  lastRequestAt = now;
  scheduleState.loading = true;
  scheduleState.error = false;
  updateRefreshButton();
  renderMatchCenter();

  try {
    const dates = getScheduleDateKeys();
    const dailyRequests = scheduleSports.flatMap((sport) => dates.map((date) => ({ type: "day", sport, date })));
    const russianLeagueRequests = russianLeagues.map((league) => ({ type: "russian-league", sport: scheduleSportsByKey[league.sport], league }));
    const requests = [...dailyRequests, ...russianLeagueRequests];
    const results = await Promise.allSettled(requests.map((request) => (
      request.type === "russian-league"
        ? fetchNextLeagueEvents(request.league)
        : fetchEventsForDay(request.sport, request.date)
    )));
    const successfulResults = results.filter((result) => result.status === "fulfilled");
    if (!successfulResults.length) throw new Error("All schedule requests failed");

    const successfulSportKeys = new Set(requests.flatMap((request, index) => (
      results[index].status === "fulfilled" ? [request.sport.key] : []
    )));
    const realMatches = results.flatMap((result, index) => {
      if (result.status !== "fulfilled") return [];
      const request = requests[index];
      return result.value.map((event) => normalizeEvent(event, request.sport, request.league));
    });
    const fetchedAt = new Date();
    const retainedMatches = matches.filter((match) => !successfulSportKeys.has(match.sport));
    matches = sortAndDeduplicate([...realMatches, ...retainedMatches]);
    writeCachedSchedule(matches, fetchedAt);
    scheduleState = {
      loading: false,
      hasLoaded: true,
      source: "network",
      fetchedAt,
      partial: successfulResults.length !== results.length,
      error: false
    };
  } catch {
    const cachedSchedule = readCachedSchedule();
    if (matches.length) {
      scheduleState = {
        loading: false,
        hasLoaded: true,
        source: "cache-fallback",
        fetchedAt: scheduleState.fetchedAt || new Date(),
        partial: false,
        error: true
      };
    } else if (cachedSchedule) {
      matches = cachedSchedule.events;
      scheduleState = {
        loading: false,
        hasLoaded: true,
        source: "cache-fallback",
        fetchedAt: cachedSchedule.fetchedAt,
        partial: false,
        error: true
      };
    } else {
      matches = [];
      scheduleState = {
        loading: false,
        hasLoaded: false,
        source: "none",
        fetchedAt: null,
        partial: false,
        error: true
      };
    }
  }

  updateRefreshButton();
  renderMatchCenter();
  scheduleNextRefresh();
}

function initializeMatchCenter() {
  if (!matchList) return;

  matchFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      activeMatchSport = filter.dataset.matchFilter || "all";
      matchFilters.forEach((item) => {
        const isActive = item === filter;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      renderMatchCenter();
    });
  });

  matchList.addEventListener("click", (event) => {
    const reminder = event.target.closest("[data-reminder]");
    if (!reminder || !matchList.contains(reminder)) return;
    const eventId = reminder.dataset.eventId;
    if (!eventId || savedMatchIds.has(eventId)) return;

    savedMatchIds.add(eventId);
    reminder.classList.add("is-saved");
    reminder.textContent = "Напоминание отмечено ✓";
    showPageToast("Готово: отметка сохранена только в текущем окне.");
  });

  matchRefresh?.addEventListener("click", () => refreshSchedule({ manual: true }));

  const cachedSchedule = readCachedSchedule();
  if (cachedSchedule) {
    matches = cachedSchedule.events;
    scheduleState = {
      loading: false,
      hasLoaded: true,
      source: "cache",
      fetchedAt: cachedSchedule.fetchedAt,
      partial: false,
      error: false
    };
    renderMatchCenter();
    if (cachedSchedule.age < freshCacheLifetime) {
      scheduleNextRefresh(freshCacheLifetime - cachedSchedule.age);
      return;
    }
  }

  refreshSchedule();
}

initializeMatchCenter();

document.querySelectorAll("[data-guide-check]").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("is-checked");
    button.setAttribute("aria-pressed", String(button.classList.contains("is-checked")));
  });
});
