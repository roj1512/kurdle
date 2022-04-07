import {
  Application,
  Router,
  Status,
} from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { compare, isValid, today, todayId } from "./wordlists.ts";

const app = new Application();
const router = new Router();

app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  try {
    await next();
  } catch (_err) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { ok: false, result: ctx.response.status };
  }
  if (!ctx.response.body) {
    ctx.response.body = {
      ok: ctx.response.status == Status.OK,
      result: ctx.response.status,
    };
  }
});

router.get("/compare", (ctx) => {
  const word = ctx.request.url.searchParams.get("word");
  if (!word) {
    ctx.response.status = Status.BadRequest;
    return;
  }
  if (word.length != 5) {
    ctx.response.status = Status.BadRequest;
    return;
  }
  ctx.response.body = {
    ok: true,
    result: {
      valid: isValid(word),
      comparison: compare(today(), word),
    },
  };
});

router.get("/id", (ctx) => {
  ctx.response.body = { ok: true, result: todayId() };
});

app.use(router.routes());

await app.listen({ port: 3000 });
