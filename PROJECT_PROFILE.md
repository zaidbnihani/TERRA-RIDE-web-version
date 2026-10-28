# ملف تعريف المشروع | Project Profile

## العربية

### الغرض المدعوم بالأدلة
المستودع يقدّم واجهة ويب عربية باتجاه RTL باسم TERRA RIDE، تعرض خدمات تنقّل موصوفة في الصفحة بأنها Terra Go وTerra Kids وTerra Care، إلى جانب أقسام عن التحقق من السائقين والسلامة والتغطية. هذا الوصف مستند إلى محتوى الواجهة (`index.html`) وبيانات المشروع (`package.json`, `metadata.json`)؛ ولا يثبت وجود منصة حجز عاملة أو تكامل فعلي للذكاء الاصطناعي أو الملاحة. صفحات الخصوصية والشروط محتوى ثابت (`privacy.html`, `terms.html`).

### المكوّنات والتدفقات الأساسية
- `index.html` صفحة الهبوط الرئيسية، وفيها أقسام التعريف والخدمات والتحقق والتغطية، وقوائم التنقل ومودالات/روابط التحميل.
- `app.js` يضيف سلوكيات واجهة أمامية: قائمة الهاتف، التمرير والتنقل النشط، رسم الجسيمات، العدادات، المودالات ومعالجات نماذج العرض. من أمثلة التدفقات أن إجراءات تسجيل الدخول تعرض رسالة نجاح محلية، ولا يظهر في المصدر إرسال بيانات إلى خدمة خلفية.
- `server.js` يشغّل Express، ويقدّم ملفات مجلد المشروع كملفات ثابتة، ويعيد `index.html` لأي مسار آخر.
- `style.css` تنسيقات الموقع، و`src/assets/images/` صور الواجهة المشار إليها من الصفحة الرئيسية.
- `privacy.html` و`terms.html` صفحتا السياسات الثابتتان، و`metadata.json` وصف وبيانات تعريفية إضافية.

### شجرة مختصرة
```text
.
├── app.js                 # تفاعلات JavaScript في المتصفح
├── index.html             # صفحة الهبوط العربية الرئيسية
├── metadata.json          # بيانات وصفية ووصف معلن للقدرات
├── package.json           # بيانات npm وسكربتات المشروع واعتماده
├── privacy.html           # صفحة سياسة الخصوصية
├── server.js              # خادم Express للملفات الثابتة واحتياط الصفحة الرئيسية
├── style.css              # تنسيقات الواجهة
├── terms.html             # صفحة شروط الاستخدام
└── src/assets/images/     # صور الواجهة
```

### الملفات المحورية
`package.json` يعرّف المشروع باسم `terra-ride` وإصدار `1.0.0` ونمط ES modules، ويحدد `server.js` كنقطة الدخول. `index.html` يربط `style.css` و`app.js` ويشير إلى صور داخل `src/assets/images/`. `server.js` يحدد المنفذ كثابت `3000` وعنوان الاستماع `0.0.0.0`. تحمّل الصفحة AOS وFont Awesome والخطوط من CDN؛ وتبدأ تهيئة AOS في `app.js` فقط إذا كان `AOS` متاحًا.

### التقنية والإصدارات والتبعيات
- JavaScript مع ES modules في Node.js (`package.json`: `"type": "module"`). إصدار Node.js غير محدد في الملفات التي تمت مراجعتها.
- الاعتماد المعلن الوحيد في `package.json`: Express `^4.19.2`.
- تعتمد الواجهة كذلك على موارد خارجية محددة في `index.html`: Font Awesome `6.5.1`، وAOS من `unpkg.com/aos@next` دون رقم إصدار ثابت، وخطوط Google Fonts (Alexandria وReadex Pro وPlus Jakarta Sans).
- لا يظهر ملف قفل تبعيات ضمن الملفات المفحوصة، لذلك لا يمكن تأكيد شجرة تثبيت دقيقة من lockfile.

### الإعداد والتشغيل والاختبار والبناء
تعلن `package.json` عن `npm run dev` و`npm start` لتشغيل `node server.js`. يحدد الخادم المنفذ `3000` مباشرةً؛ لا يقرأ متغير بيئة لتغييره. يتطلب التشغيل تثبيت الاعتماد المعلن Express، لكن لا توجد في المستودع تعليمات إعداد إضافية أو إصدار Node محدد.

يوجد سكربت `npm run build` لكنه ينفّذ فقط أمر Node يطبع `Build complete`، ولا توجد دلالة في الملفات على عملية تجميع فعلية. وبالمثل فإن `npm run lint` يطبع `No lint issues` فقط، وليس إعداد مدقق شيفرة. لم تُعثر على اختبارات أو إعداد CI ضمن الشجرة المفحوصة؛ لذلك لا يوجد أمر اختبار موثق.

### إعدادات ونقاط عملية للمطور
- متغيرات البيئة: لا يقرأ المصدر أي متغيرات إعداد؛ `PORT` في `server.js` ثابت JavaScript وليس متغير بيئة.
- نقطة بدء الاستكشاف العملية هي `index.html` ثم `app.js` و`style.css`، مع `server.js` عند الحاجة إلى تقديم الملفات عبر HTTP.
- الموارد الخارجية من CDN مطلوبة لبعض الخطوط والأيقونات والحركات، بينما تعتمد الوظائف المرئية على ملفات محلية المشار إليها في الشجرة.
- تحقق من أن ملفات الصور الموجودة تطابق المسارات في `index.html` عند إجراء تغييرات على الأصول.

### نقاط غير محسومة
لا توجد وثائق README في جذر المستودع. يذكر `metadata.json` قدرة باسم `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`، لكن الملفات التي تمت مراجعتها لا تعرض تكامل Gemini أو API خادميًا؛ فلا ينبغي اعتبار الوصف إثباتًا لتنفيذه. كما أن روابط التنزيل تشير إلى صفحة إصدارات GitHub، ولا يوضح هذا المستودع وحده وجود حزم منشورة أو تطبيقات أصلية. لا توجد اختبارات أو CI ظاهرة.

### مسارات الأدلة
`package.json`, `server.js`, `index.html`, `app.js`, `style.css`, `metadata.json`, `privacy.html`, `terms.html`, `src/assets/images/`.

## English

### Evidence-supported purpose
This repository provides an Arabic, right-to-left TERRA RIDE web interface. It presents mobility services named Terra Go, Terra Kids, and Terra Care, along with driver-verification, safety, and coverage sections. This description is supported by the UI (`index.html`) and project metadata (`package.json`, `metadata.json`); it does not establish that a working booking platform, AI integration, or navigation service exists. The privacy and terms pages are static content (`privacy.html`, `terms.html`).

### Main components and flows
- `index.html` is the main landing page, with introduction, services, verification, and coverage sections, navigation, and download modal/links.
- `app.js` adds browser-side UI behavior: mobile menu, scrolling and active navigation, particle animation, counters, modals, and presentation-form handlers. For example, the login handler displays a local success message; the source shows no submission to a backend service.
- `server.js` starts Express, serves the project directory as static files, and returns `index.html` for every other path.
- `style.css` contains site styling, and `src/assets/images/` contains images referenced by the landing page.
- `privacy.html` and `terms.html` are static policy pages; `metadata.json` contains additional metadata and declared capabilities.

### Short directory and file map
```text
.
├── app.js                 # Browser-side JavaScript interactions
├── index.html             # Main Arabic landing page
├── metadata.json          # Metadata and declared capability description
├── package.json           # npm metadata, scripts, and dependency
├── privacy.html           # Privacy policy page
├── server.js              # Express static-file server and landing-page fallback
├── style.css              # Interface styles
├── terms.html             # Terms page
└── src/assets/images/     # Interface images
```

### Key files
`package.json` names the project `terra-ride`, sets version `1.0.0` and ES-module mode, and declares `server.js` as the entry point. `index.html` links `style.css` and `app.js` and references images under `src/assets/images/`. `server.js` hard-codes port `3000` and listens on `0.0.0.0`. The page loads AOS, Font Awesome, and fonts from CDNs; `app.js` initializes AOS only when `AOS` is available.

### Technology, versions, and dependencies
- JavaScript using Node.js ES modules (`package.json`: `"type": "module"`). The reviewed files do not specify a Node.js version.
- The only dependency declared in `package.json` is Express `^4.19.2`.
- The UI also uses external resources declared in `index.html`: Font Awesome `6.5.1`, AOS from `unpkg.com/aos@next` without a pinned version, and Google Fonts (Alexandria, Readex Pro, and Plus Jakarta Sans).
- No dependency lockfile appears in the reviewed files, so an exact installed dependency tree cannot be verified from a lockfile.

### Setup, run, test, and build
`package.json` declares `npm run dev` and `npm start` to run `node server.js`. The server hard-codes port `3000`; it does not read an environment variable to change it. Running requires the declared Express dependency, but the repository provides no further setup instructions or Node.js version.

A `npm run build` script exists, but it only runs a Node command that prints `Build complete`; the files do not indicate an actual compilation step. Likewise, `npm run lint` only prints `No lint issues` and is not a configured linter. No tests or CI configuration were found in the reviewed tree, so there is no documented test command.

### Configuration and practical notes for new developers
- Environment variables: the source reads no configuration variables; `PORT` in `server.js` is a JavaScript constant, not an environment variable.
- Start exploring with `index.html`, then `app.js` and `style.css`; use `server.js` when the files need to be served over HTTP.
- External CDN resources are used for some fonts, icons, and animations, while the page also references local assets.
- When changing assets, verify that image files present in the tree match the paths in `index.html`.

### Open questions and limitations
There is no README in the repository root. `metadata.json` declares a capability named `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`, but the reviewed files do not show a Gemini integration or server-side API; the metadata declaration alone is not proof of implementation. Download links point to a GitHub releases page, but this repository alone does not establish that packages or native apps are published. No tests or CI are visible.

### Evidence paths
`package.json`, `server.js`, `index.html`, `app.js`, `style.css`, `metadata.json`, `privacy.html`, `terms.html`, `src/assets/images/`.
