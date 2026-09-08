// frontend/i18n.js — minimal i18n for KnowledgeBook.
//
// Loaded as a plain JS file (no Babel) BEFORE any .jsx file in index.html,
// after the React UMD scripts. Exposes:
//   window.I18N.t(key, lang, vars?)  — pure function, safe to call anywhere
//   window.LangContext                — React.Context (default "en")
//   window.useT()                     — hook: returns (key, vars) => string
//
// Translation key convention follows react-i18next:
//   namespace.dotted.key  (semantic, not English-string-as-key)
// Missing key → falls back to en → falls back to key itself (never crashes).
(function () {
  "use strict";

  const STRINGS = {

    // ── common (cross-page reusable) ──
    "common.cancel":          { zh: "Cancel", en: "Cancel" },
    "common.confirm":         { zh: "Confirm", en: "Confirm" },
    "common.done":            { zh: "Done", en: "Done" },
    "common.close":           { zh: "Close", en: "Close" },
    "common.delete":          { zh: "Delete", en: "Delete" },
    "common.save":            { zh: "Save", en: "Save" },
    "common.loading":         { zh: "Loading…", en: "Loading…" },
    "common.unknown_error":   { zh: "Unknown error", en: "Unknown error" },

    // ── language modal (first-run / re-pick) ──
    "lang_modal.title":       { zh: "Choose your reply language", en: "Choose your reply language" },
    "lang_modal.title_bi":    { zh: "选择回答语言 / Choose your reply language", en: "选择回答语言 / Choose your reply language" },
    "lang_modal.hint":        {
      zh: "The assistant will reply ONLY in this language for chat, notes, quiz, and report generations. You can change this anytime via the topbar chip.", en: "The assistant will reply ONLY in this language for chat, notes, quiz, and report generations. You can change this anytime via the topbar chip.",
    },
    "lang_modal.hint_bi":     {
      zh: "选定后 AI 仅以此语言回答聊天 / 笔记 / 测验 / 报告。可随时通过顶栏切换。\nThe assistant will reply ONLY in this language. You can change anytime via the topbar.", en: "选定后 AI 仅以此语言回答聊天 / 笔记 / 测验 / 报告。可随时通过顶栏切换。\nThe assistant will reply ONLY in this language. You can change anytime via the topbar.",
    },

    // ── topbar ──
    "topbar.manage_courses":         { zh: "Manage", en: "Manage" },
    "topbar.manage_courses_count":   { zh: "Manage · {n} hidden", en: "Manage · {n} hidden" },
    "topbar.manage_tooltip":         {
      zh: "Manage course visibility (frontend-only hide; backend data is preserved)", en: "Manage course visibility (frontend-only hide; backend data is preserved)",
    },
    "topbar.lang_chip_title":        { zh: "Reply language preference (click to change)", en: "Reply language preference (click to change)" },
    "topbar.lang_chip_title_unset":  { zh: "Pick reply language", en: "Pick reply language" },
    "topbar.lang_chip_zh":           { zh: "中", en: "中" },
    "topbar.lang_chip_en":           { zh: "EN", en: "EN" },
    "topbar.backend_cycle":          { zh: "Click to switch backend", en: "Click to switch backend" },
    "topbar.backend_only":           { zh: "Only configured backend", en: "Only configured backend" },
    "topbar.settings":               { zh: "Settings (helper name, language, backend, cache)", en: "Settings (helper name, language, backend, cache)" },
    "topbar.notes_polishing":        { zh: "✨ Polishing", en: "✨ Polishing" },
    "topbar.notes_polishing_tip":    {
      zh: "Pass 2: unify terminology, add cross-refs, collapse duplicate definitions. Replaces the draft once done.", en: "Pass 2: unify terminology, add cross-refs, collapse duplicate definitions. Replaces the draft once done.",
    },
    "topbar.notes_truncated":        { zh: "⚠️ {n} truncated", en: "⚠️ {n} truncated" },
    "topbar.notes_truncated_lines": {
      zh: "The following files were truncated due to output token limit:", en: "The following files were truncated due to output token limit:",
    },
    "topbar.notes_truncated_review": {
      zh: "Review pass was also truncated — notes may be incomplete near the end", en: "Review pass was also truncated — notes may be incomplete near the end",
    },
    "topbar.notes_truncated_hint": {
      zh: "Tip: raise NOTES_PER_FILE_MAX_TOKENS / NOTES_REVIEW_MAX_TOKENS to retry", en: "Tip: raise NOTES_PER_FILE_MAX_TOKENS / NOTES_REVIEW_MAX_TOKENS to retry",
    },

    // ── empty workspace ──
    "empty.title":             { zh: "Upload documents to begin", en: "Upload documents to begin" },
    "empty.subtitle":          {
      zh: "Drop in a PDF / PPTX / DOCX / Markdown — sections are extracted, a knowledge graph is built, and chat + notes light up automatically.", en: "Drop in a PDF / PPTX / DOCX / Markdown — sections are extracted, a knowledge graph is built, and chat + notes light up automatically.",
    },
    "empty.cta":               { zh: "Upload your first document", en: "Upload your first document" },

    // ── course picker / upload modal ──
    "upload.modal_title":      { zh: "Upload to which course?", en: "Upload to which course?" },
    "upload.close_aria":       { zh: "Close", en: "Close" },
    "upload.close_title":      { zh: "Close (Esc)", en: "Close (Esc)" },
    "upload.existing_courses": { zh: "Add to existing course", en: "Add to existing course" },
    "upload.or_create":        { zh: "Or create a course", en: "Or create a course" },
    "upload.create":           { zh: "Create a course", en: "Create a course" },
    "upload.new_placeholder":  { zh: "Enter new course name", en: "Enter new course name" },
    "upload.dup_msg":          { zh: "A course with this name exists — pick it above", en: "A course with this name exists — pick it above" },
    "upload.invalid_msg":      { zh: "Invalid characters — only letters / digits / Chinese / spaces / . - _", en: "Invalid characters — only letters / digits / Chinese / spaces / . - _" },
    "upload.create_btn":       { zh: "Create and upload", en: "Create and upload" },
    "upload.dup_helper":       { zh: "Course \"{name}\" already exists — pick it above or use a different name.", en: "Course \"{name}\" already exists — pick it above or use a different name." },
    "upload.naming_hint":      {
      zh: "Names allow letters / digits / Chinese / spaces / . - _, and must not contain \"..\" or start / end with \".\".", en: "Names allow letters / digits / Chinese / spaces / . - _, and must not contain \"..\" or start / end with \".\".",
    },
    "upload.engine_label":     { zh: "PDF extraction engine", en: "PDF extraction engine" },
    "upload.engine_default":   { zh: "Default · ms · no formula parsing", en: "Default · ms · no formula parsing" },
    "upload.engine_mineru":    { zh: "High quality · ~10s/page · LaTeX + tables", en: "High quality · ~10s/page · LaTeX + tables" },
    "upload.invalid_id_title": { zh: "Invalid course id: {cid}", en: "Invalid course id: {cid}" },
    "upload.refresh_lost":     {
      zh: "Original files are no longer in memory (page was refreshed). Please pick the files again.", en: "Original files are no longer in memory (page was refreshed). Please pick the files again.",
    },

    // ── course manager modal ──
    "course_mgr.title":            { zh: "Course visibility", en: "Course visibility" },
    "course_mgr.hint": {
      zh: "Unchecked courses are hidden from the topbar dropdown — frontend-only filter; backend data in artifacts/courses/ is preserved. Resets if you switch browsers or clear localStorage.\nThe red 🗑 Delete button is a hard delete: it removes files + indices + browser cache. Cannot be undone.", en: "Unchecked courses are hidden from the topbar dropdown — frontend-only filter; backend data in artifacts/courses/ is preserved. Resets if you switch browsers or clear localStorage.\nThe red 🗑 Delete button is a hard delete: it removes files + indices + browser cache. Cannot be undone.",
    },
    "course_mgr.empty":            { zh: "No courses to manage.", en: "No courses to manage." },
    "course_mgr.delete_btn":       { zh: "🗑 Delete", en: "🗑 Delete" },
    "course_mgr.delete_tooltip":   {
      zh: "Hard-delete course {cid} (disk + indices + browser cache)", en: "Hard-delete course {cid} (disk + indices + browser cache)",
    },
    "course_mgr.show_all":         { zh: "Show all ({n})", en: "Show all ({n})" },

    // ── confirm dialogs (window.confirm / window.alert) ──
    "confirm.delete_course": {
      zh: "Hard-delete course \"{cid}\"?\n\nThis removes:\n - artifacts/courses/{cid}/ on disk\n - FAISS + BM25 indices for this course\n - All browser localStorage cache for this course\n\nThis is irreversible. If this is a pre-bundled course, deleting it disables the rollback hatch.", en: "Hard-delete course \"{cid}\"?\n\nThis removes:\n - artifacts/courses/{cid}/ on disk\n - FAISS + BM25 indices for this course\n - All browser localStorage cache for this course\n\nThis is irreversible. If this is a pre-bundled course, deleting it disables the rollback hatch.",
    },
    "confirm.delete_course_typeid": {
      zh: "Type the exact course ID (case-sensitive) to confirm deletion:\n{cid}", en: "Type the exact course ID (case-sensitive) to confirm deletion:\n{cid}",
    },
    "confirm.delete_course_mismatch": {
      zh: "Mismatch: you typed \"{typed}\" but \"{cid}\" was expected. Cancelled.", en: "Mismatch: you typed \"{typed}\" but \"{cid}\" was expected. Cancelled.",
    },
    "confirm.delete_course_done": {
      zh: "Course \"{cid}\" deleted ({n} files / directories).", en: "Course \"{cid}\" deleted ({n} files / directories).",
    },
    "confirm.delete_course_gone": {
      zh: "Course \"{cid}\" no longer exists (maybe deleted in another tab).", en: "Course \"{cid}\" no longer exists (maybe deleted in another tab).",
    },
    "confirm.delete_course_failed": {
      zh: "Delete failed: {msg}", en: "Delete failed: {msg}",
    },

    // ── notes editor / latex compile ──
    "notes.compile_tectonic_missing": {
      zh: "Tectonic unavailable: server has no LaTeX compiler installed.", en: "Tectonic unavailable: server has no LaTeX compiler installed.",
    },
    "notes.compile_blocked": {
      zh: "Security check blocked: {reason}", en: "Security check blocked: {reason}",
    },
    "notes.compile_blocked_reason_default": {
      zh: "Contains disallowed LaTeX commands", en: "Contains disallowed LaTeX commands",
    },
    "notes.compile_failed": {
      zh: "LaTeX compile failed (exit {exit}):\n{tail}", en: "LaTeX compile failed (exit {exit}):\n{tail}",
    },
    "notes.compile_failed_exit_unknown": { zh: "?", en: "?" },
    "notes.compile_timeout": {
      zh: "Compile timeout (>60s). The document may have an infinite loop or heavy figures.", en: "Compile timeout (>60s). The document may have an infinite loop or heavy figures.",
    },
    "notes.compile_network_err": {
      zh: "Network error: {msg}", en: "Network error: {msg}",
    },
    "notes.toolbar_locked_edit":    { zh: "Toolbar is always open in Edit mode", en: "Toolbar is always open in Edit mode" },
    "notes.toolbar_expand":         { zh: "Expand toolbar", en: "Expand toolbar" },
    "notes.toolbar_collapse":       { zh: "Collapse toolbar", en: "Collapse toolbar" },
    "notes.download_tex":           { zh: ".tex", en: ".tex" },
    "notes.download_tex_tip":       { zh: "Download .tex source", en: "Download .tex source" },
    "notes.print_pdf":              { zh: "PDF (print)", en: "PDF (print)" },
    "notes.print_pdf_tip":          { zh: "Print via browser (quick preview)", en: "Print via browser (quick preview)" },
    "notes.tectonic_checking":      { zh: "Checking tectonic status…", en: "Checking tectonic status…" },
    "notes.tectonic_compile":       { zh: "Server-side LaTeX compile (academic typesetting)", en: "Server-side LaTeX compile (academic typesetting)" },

    // ── reader / preview ──
    "reader.open_in_reader":       { zh: "Open in Reader ↗", en: "Open in Reader ↗" },
    "reader.open_in_reader_tip":   { zh: "Switch to Reader tab for full view", en: "Switch to Reader tab for full view" },
    "reader.preview_close_aria":   { zh: "Close preview", en: "Close preview" },
    "reader.preview_close_title":  { zh: "Close (Esc)", en: "Close (Esc)" },
    "reader.source_missing":       {
      zh: "Source file missing on disk · view in Reader text mode", en: "Source file missing on disk · view in Reader text mode",
    },

    // ── upload / processing status ──
    "processing.poll_failed":      { zh: "Status polling keeps failing — try again later", en: "Status polling keeps failing — try again later" },
    "processing.unrecoverable":    { zh: "Upload task unrecoverable — please retry", en: "Upload task unrecoverable — please retry" },

    // ── settings (large block) ──
    "settings.title":              { zh: "Settings", en: "Settings" },
    "settings.section_general":    { zh: "General", en: "General" },
    "settings.section_persona":    { zh: "Assistant persona", en: "Assistant persona" },
    "settings.section_backend":    { zh: "LLM backend", en: "LLM backend" },
    "settings.section_lang":       { zh: "Reply language", en: "Reply language" },
    "settings.section_embedding":  { zh: "Embedding model", en: "Embedding model" },
    "settings.section_cache":      { zh: "Frontend cache", en: "Frontend cache" },
    "settings.lang_zh_chip":       { zh: "🇨🇳 中文", en: "🇨🇳 中文" },
    "settings.lang_en_chip":       { zh: "🇺🇸 English", en: "🇺🇸 English" },
    "settings.lang_current":       { zh: "Current: {label}", en: "Current: {label}" },
    "settings.lang_label_zh":      { zh: "中文", en: "中文" },
    "settings.lang_label_en":      { zh: "English", en: "English" },
    "settings.lang_unset":         {
      zh: "Not set — you'll be prompted on launch", en: "Not set — you'll be prompted on launch",
    },
    "settings.clear_cache":        { zh: "Clear cache", en: "Clear cache" },
    "settings.clear_cache_confirm":{
      zh: "Clear all frontend cache (preferences language / backend / persona are kept)?", en: "Clear all frontend cache (preferences language / backend / persona are kept)?",
    },
    "settings.clear_course_cache_confirm": {
      zh: "Clear all frontend cache for course {cid}?\n(Note drafts, KG view state, and quiz answers will be lost. Server-side data is untouched.)", en: "Clear all frontend cache for course {cid}?\n(Note drafts, KG view state, and quiz answers will be lost. Server-side data is untouched.)",
    },
    "settings.reset_prefs_confirm": {
      zh: "Reset all preferences (language, backend, persona, KG view, hidden courses)?\nYou'll be prompted to pick a language again on next launch.", en: "Reset all preferences (language, backend, persona, KG view, hidden courses)?\nYou'll be prompted to pick a language again on next launch.",
    },

    // ── library (source picker) ──
    "library.select_all":          { zh: "All", en: "All" },
    "library.select_none":         { zh: "None", en: "None" },
    "library.invert":              { zh: "Invert", en: "Invert" },
    "library.select_all_tip":      { zh: "Select all sources", en: "Select all sources" },
    "library.select_none_tip":     { zh: "Clear all selections", en: "Clear all selections" },
    "library.invert_tip":          { zh: "Invert selection", en: "Invert selection" },
    "library.shift_hint":          { zh: "Shift+Click for range select", en: "Shift+Click for range select" },

    // ── exam-prep ──
    "exam.variant_brewing":        { zh: "Generating variants…", en: "Generating variants…" },
    "exam.variant_brewing_tip":    {
      zh: "New questions are generated in the background. They'll appear next time you open a quiz.", en: "New questions are generated in the background. They'll appear next time you open a quiz.",
    },
    // ── Exam Prep page ──
    "exam.title":                       { zh: "Exam Prep", en: "Exam Prep" },
    "exam.empty_select_course":         { zh: "Select a course from the sidebar to begin exam preparation.", en: "Select a course from the sidebar to begin exam preparation." },
    "exam.empty_no_topics":             { zh: "No exam bank yet for this course. Extract topics from the course materials to begin.", en: "No exam bank yet for this course. Extract topics from the course materials to begin." },
    "exam.action.extract_topics":       { zh: "Extract Exam Topics", en: "Extract Exam Topics" },
    "exam.action.re_extract":           { zh: "Re-extract topics", en: "Re-extract topics" },
    "exam.action.reset":                { zh: "Reset bank", en: "Reset bank" },
    "exam.action.start_mixed":          { zh: "Start Mixed Quiz · all non-mastered topics", en: "Start Mixed Quiz · all non-mastered topics" },
    "exam.tooltip.re_extract":          { zh: "Run topic extraction again. Mastery history for renamed topics moves to an archive.", en: "Run topic extraction again. Mastery history for renamed topics moves to an archive." },
    "exam.confirm.re_extract":          {
      zh: "Re-extract exam topics? Existing questions are preserved for any topic whose name matches the new extraction (normalized). Topics whose names changed will have their questions moved to an archive bucket you can still see. Continue?", en: "Re-extract exam topics? Existing questions are preserved for any topic whose name matches the new extraction (normalized). Topics whose names changed will have their questions moved to an archive bucket you can still see. Continue?",
    },
    "exam.confirm.reset":               { zh: "Wipe the entire exam bank? You'll need to re-extract topics from scratch.", en: "Wipe the entire exam bank? You'll need to re-extract topics from scratch." },
    "exam.stats.questions_mastered":    { zh: "{done} / {total} questions mastered", en: "{done} / {total} questions mastered" },
    "exam.stats.topics_mastered":       { zh: "{done} / {total} topics fully mastered", en: "{done} / {total} topics fully mastered" },
    "exam.stats.attempts":              { zh: "{n} attempts", en: "{n} attempts" },
    "exam.stats.correct_pct":           { zh: "{pct}% correct", en: "{pct}% correct" },
    // Busy labels (shown while loading)
    "exam.busy.working":                { zh: "Working…", en: "Working…" },
    "exam.busy.loading_bank":           { zh: "Loading exam bank…", en: "Loading exam bank…" },
    "exam.busy.extracting":             { zh: "Extracting exam topics from course materials…", en: "Extracting exam topics from course materials…" },
    "exam.busy.sampling":               { zh: "Sampling questions from the bank…", en: "Sampling questions from the bank…" },
    "exam.busy.grading":                { zh: "Grading + generating fresh variants for any wrong topics…", en: "Grading + generating fresh variants for any wrong topics…" },
    "exam.busy.resetting":              { zh: "Resetting bank…", en: "Resetting bank…" },
    "exam.busy.elapsed":                { zh: "{n}s elapsed", en: "{n}s elapsed" },
    "exam.busy.elapsed_long_hint":      { zh: " — reasoning models can take up to 120s before timing out", en: " — reasoning models can take up to 120s before timing out" },
    // Errors
    "exam.error.gen_failed":            { zh: "Question generation failed for this topic. Please retry — the LLM may have timed out or returned malformed JSON.", en: "Question generation failed for this topic. Please retry — the LLM may have timed out or returned malformed JSON." },
    "exam.error.all_mastered":          { zh: "All questions in scope are already mastered. Try re-extracting topics or pick a different topic.", en: "All questions in scope are already mastered. Try re-extracting topics or pick a different topic." },
    "exam.error.no_questions":          { zh: "No questions available — try seeding this topic or check the course KB has content.", en: "No questions available — try seeding this topic or check the course KB has content." },
    "exam.error.answer_at_least_one":   { zh: "Please answer at least one question before submitting.", en: "Please answer at least one question before submitting." },
    "exam.error.failed_load_bank":      { zh: "Failed to load exam bank", en: "Failed to load exam bank" },
    "exam.error.failed_extract":        { zh: "Topic extraction failed", en: "Topic extraction failed" },
    "exam.error.failed_start":          { zh: "Failed to start quiz", en: "Failed to start quiz" },
    "exam.error.failed_submit":         { zh: "Submit failed", en: "Submit failed" },
    "exam.error.failed_reset":          { zh: "Reset failed", en: "Reset failed" },
    "exam.info.re_extract_done":        {
      zh: "Re-extract complete · {migrated} topic(s) carried questions forward · {orphans} orphan questions archived (visible in a \"[archive] ...\" topic).", en: "Re-extract complete · {migrated} topic(s) carried questions forward · {orphans} orphan questions archived (visible in a \"[archive] ...\" topic).",
    },
    // Topic card
    "exam.topic.weight":                { zh: "weight · {pct}%", en: "weight · {pct}%" },
    "exam.topic.mastered_count":        { zh: "{done} / {total} mastered", en: "{done} / {total} mastered" },
    "exam.topic.attempts":              { zh: "{n} attempt(s)", en: "{n} attempt(s)" },
    "exam.topic.correct_rate":          { zh: "{pct}% correct", en: "{pct}% correct" },
    "exam.topic.mastered_chip":         { zh: "✓ mastered", en: "✓ mastered" },
    "exam.topic.re_quiz_tip":           { zh: "Re-quiz this topic (already mastered)", en: "Re-quiz this topic (already mastered)" },
    "exam.topic.start_quiz_tip":        { zh: "Start quiz on {name}", en: "Start quiz on {name}" },
    "exam.topic.review_btn":            { zh: "Review mastered →", en: "Review mastered →" },
    "exam.topic.start_btn":             { zh: "Quiz on this topic →", en: "Quiz on this topic →" },
    "exam.archive.label":               { zh: "Archive · {n} bucket(s) of orphan questions from previous re-extracts (not sampled for new quizzes).", en: "Archive · {n} bucket(s) of orphan questions from previous re-extracts (not sampled for new quizzes)." },
    // Quiz view
    "exam.quiz.title":                  { zh: "Quiz · {n} questions", en: "Quiz · {n} questions" },
    "exam.quiz.scoped_topic":           { zh: " · scoped to topic", en: " · scoped to topic" },
    "exam.quiz.placeholder":            { zh: "Your answer…", en: "Your answer…" },
    "exam.quiz.back":                   { zh: "Back", en: "Back" },
    "exam.quiz.submit":                 { zh: "Submit · grade {n} answer(s)", en: "Submit · grade {n} answer(s)" },
    // Result view
    "exam.result.correct":              { zh: "correct", en: "correct" },
    "exam.result.wrong":                { zh: "wrong", en: "wrong" },
    "exam.result.score":                { zh: "score", en: "score" },
    "exam.result.fresh_variants":       { zh: "fresh variants generated", en: "fresh variants generated" },
    "exam.result.fresh_variants_tip":   { zh: "Self-evolution: {n} variants per wrong topic", en: "Self-evolution: {n} variants per wrong topic" },
    "exam.result.your_answer":          { zh: "Your answer:", en: "Your answer:" },
    "exam.result.empty_answer":         { zh: "(empty)", en: "(empty)" },
    "exam.result.expected":             { zh: "Expected:", en: "Expected:" },
    "exam.result.why":                  { zh: "Why:", en: "Why:" },
    "exam.result.back_topics":          { zh: "Back to Topics", en: "Back to Topics" },
    "exam.result.another_round":        { zh: "Another Round", en: "Another Round" },

    // ── processing (upload progress) ──
    "processing.sec_suffix":       { zh: "s", en: "s" },
    "processing.min_suffix":       { zh: "m", en: "m" },
    "processing.hour_suffix":      { zh: "h", en: "h" },
    "processing.elapsed":          { zh: "Elapsed", en: "Elapsed" },
    "processing.remaining":        { zh: "~{t} remaining", en: "~{t} remaining" },
    "processing.pages_total":      { zh: "{n} pages total", en: "{n} pages total" },
    "processing.estimate_about":   { zh: "Estimated", en: "Estimated" },
    "processing.pages_progress":   { zh: "{done} / {total} pages", en: "{done} / {total} pages" },
    "processing.with_pptx_render": { zh: "rendering {n} pptx preview(s)", en: "rendering {n} pptx preview(s)" },
    "processing.failed_at":        { zh: "Upload pipeline failed at stage {stage}", en: "Upload pipeline failed at stage {stage}" },
    // Stage rows shown in the upload overlay (5 stages, lbl + sub each).
    "processing.stage.extracting.lbl":  { zh: "Extracting", en: "Extracting" },
    "processing.stage.extracting.sub":  { zh: "MinerU / PyMuPDF · pages → text", en: "MinerU / PyMuPDF · pages → text" },
    "processing.stage.chunking.lbl":    { zh: "Chunking", en: "Chunking" },
    "processing.stage.chunking.sub":    { zh: "Segmenting into 1.5KB chunks", en: "Segmenting into 1.5KB chunks" },
    "processing.stage.embedding.lbl":   { zh: "Embedding", en: "Embedding" },
    "processing.stage.embedding.sub":   { zh: "FAISS vector + BM25 index", en: "FAISS vector + BM25 index" },
    "processing.stage.kg_stage_a.lbl":  { zh: "KG Stage A", en: "KG Stage A" },
    "processing.stage.kg_stage_a.sub":  { zh: "Macro topics + course overview", en: "Macro topics + course overview" },
    "processing.stage.kg_stage_b.lbl":  { zh: "KG Stage B", en: "KG Stage B" },
    "processing.stage.kg_stage_b.sub":  { zh: "Per-chunk concepts + relations", en: "Per-chunk concepts + relations" },

    // ── reader (PDF outline toggle) ──
    "reader.show_outline":         { zh: "📑 Show outline", en: "📑 Show outline" },
    "reader.hide_outline":         { zh: "📑 Hide outline", en: "📑 Hide outline" },
    "reader.show_outline_tip":     { zh: "Show PDF outline / thumbnails sidebar", en: "Show PDF outline / thumbnails sidebar" },
    "reader.hide_outline_tip":     { zh: "Hide PDF outline / thumbnails sidebar", en: "Hide PDF outline / thumbnails sidebar" },

    // ── mindmap (knowledge graph) ──
    "mindmap.new_node":            { zh: "New node", en: "New node" },
    "mindmap.filtered_all":        { zh: "All relations filtered · isolated nodes remain", en: "All relations filtered · isolated nodes remain" },
    "mindmap.show_legend":         { zh: "Show legend", en: "Show legend" },
    "mindmap.hide_legend":         { zh: "Hide legend", en: "Hide legend" },

    // ── assistant (chat sidebar) ──
    "assistant.default_persona":      { zh: "Study Assistant", en: "Study Assistant" },
    "assistant.persona_desc":         { zh: "Study assistant · course material Q&A", en: "Study assistant · course material Q&A" },
    "assistant.placeholder_normal":   { zh: "Ask {name} a question…", en: "Ask {name} a question…" },
    "assistant.placeholder_thinking": { zh: "Esc to cancel · Shift+Enter for newline", en: "Esc to cancel · Shift+Enter for newline" },
    "assistant.send":                 { zh: "Send (Enter)", en: "Send (Enter)" },
    "assistant.cancel":               { zh: "Cancel (Esc)", en: "Cancel (Esc)" },
    "assistant.hide_suggestions":     { zh: "Hide quick suggestions (toggleable later)", en: "Hide quick suggestions (toggleable later)" },
    "assistant.show_suggestions":     { zh: "Show quick suggestions", en: "Show quick suggestions" },
    "assistant.rewrite_tip":          {
      zh: "Backend rewrote your follow-up question into a self-contained retrieval query", en: "Backend rewrote your follow-up question into a self-contained retrieval query",
    },
    "assistant.error_connect":        { zh: "Failed to connect to backend", en: "Failed to connect to backend" },
    "assistant.error_prefix":         { zh: "Error: {msg}", en: "Error: {msg}" },
    "assistant.step_searching":       { zh: "Searching knowledge base", en: "Searching knowledge base" },

    // ── Reader "no source loaded" welcome / operation guide ──
    "reader.welcome.chapter":         { zh: "KnowledgeBook", en: "KnowledgeBook" },
    "reader.welcome.title":           { zh: "Welcome to KnowledgeBook", en: "Welcome to KnowledgeBook" },
    "reader.welcome.sub":             { zh: "Upload course materials or select a course to begin · operation guide below", en: "Upload course materials or select a course to begin · operation guide below" },
    "reader.welcome.intro":           {
      zh: "KnowledgeBook is a self-hosted study assistant: upload course materials → automatic knowledge graph + vector index → ask questions with citations, generate structured notes, and practice with a self-evolving quiz bank. This guide walks through the whole flow, from first upload to advanced usage.", en: "KnowledgeBook is a self-hosted study assistant: upload course materials → automatic knowledge graph + vector index → ask questions with citations, generate structured notes, and practice with a self-evolving quiz bank. This guide walks through the whole flow, from first upload to advanced usage.",
    },

    // 1. Getting started
    "reader.welcome.h1":              { zh: "Getting Started", en: "Getting Started" },
    "reader.welcome.s11_h":           { zh: "Add your first course", en: "Add your first course" },
    "reader.welcome.s11_p":           {
      zh: "Click \"+\" in the left Library panel (or drag files onto it) → Course Picker opens: name a course → pick the extractor engine (PyMuPDF is fast at ~0.05s/page; MinerU is slow at ~10s/page but recovers LaTeX equations and HTML tables — strongly recommended for slide decks with formulas) → pick the PDF / PPTX / DOCX / MD files to upload → confirm. The background pipeline runs five stages: extracting → chunking → embedding → KG Stage A (topics) → Stage B (leaf concepts). Progress bar and ETA shown live.", en: "Click \"+\" in the left Library panel (or drag files onto it) → Course Picker opens: name a course → pick the extractor engine (PyMuPDF is fast at ~0.05s/page; MinerU is slow at ~10s/page but recovers LaTeX equations and HTML tables — strongly recommended for slide decks with formulas) → pick the PDF / PPTX / DOCX / MD files to upload → confirm. The background pipeline runs five stages: extracting → chunking → embedding → KG Stage A (topics) → Stage B (leaf concepts). Progress bar and ETA shown live.",
    },
    "reader.welcome.s12_h":           { zh: "Configure an LLM provider", en: "Configure an LLM provider" },
    "reader.welcome.s12_p":           {
      zh: "Top-right gear icon → Settings → AI Backend & Models. Click \"+ Add provider\" → pick a vendor from the preset dropdown (OpenAI / DeepSeek / Moonshot / Zhipu / MiniMax / Groq / Together / Gemini / Anthropic Claude / local Ollama / vLLM / LM Studio) → base URL and model auto-fill → API key: prefer \"From env var\" (the key stays in .env, never lands on disk) → save. You can configure multiple providers; the topbar chip cycles between them, and each row has a \"Test\" button for a 5-second connectivity probe.", en: "Top-right gear icon → Settings → AI Backend & Models. Click \"+ Add provider\" → pick a vendor from the preset dropdown (OpenAI / DeepSeek / Moonshot / Zhipu / MiniMax / Groq / Together / Gemini / Anthropic Claude / local Ollama / vLLM / LM Studio) → base URL and model auto-fill → API key: prefer \"From env var\" (the key stays in .env, never lands on disk) → save. You can configure multiple providers; the topbar chip cycles between them, and each row has a \"Test\" button for a 5-second connectivity probe.",
    },

    // 2. Core features
    "reader.welcome.h2":              { zh: "Core Features", en: "Core Features" },
    "reader.welcome.s21_h":           { zh: "Assistant — Q&A with citations", en: "Assistant — Q&A with citations" },
    "reader.welcome.s21_p":           {
      zh: "Right-side Assistant panel — ask anything about the active course or all courses. Citation chips in the reply (e.g. [s1] [s2]) are clickable → auto-jump to the Reader tab at the source page. Five retrieval paths: intent router → graphrag (KG-augmented retrieval) → RAG (BM25 + vector hybrid) → translate → cross-course → general. The topbar chip switches which LLM provider answers this turn.", en: "Right-side Assistant panel — ask anything about the active course or all courses. Citation chips in the reply (e.g. [s1] [s2]) are clickable → auto-jump to the Reader tab at the source page. Five retrieval paths: intent router → graphrag (KG-augmented retrieval) → RAG (BM25 + vector hybrid) → translate → cross-course → general. The topbar chip switches which LLM provider answers this turn.",
    },
    "reader.welcome.s22_h":           { zh: "Reader — browse source content", en: "Reader — browse source content" },
    "reader.welcome.s22_p":           {
      zh: "Switch to the Reader tab to browse the original course materials. PDFs use the browser's PDF.js / PDFium viewer (turn pages, full-text search). PPTX renders via a LibreOffice-generated PDF sidecar. Clicking a citation in the Assistant auto-highlights the corresponding chunk. The outline toggle on the left collapses/expands PDF bookmarks and thumbnails.", en: "Switch to the Reader tab to browse the original course materials. PDFs use the browser's PDF.js / PDFium viewer (turn pages, full-text search). PPTX renders via a LibreOffice-generated PDF sidecar. Clicking a citation in the Assistant auto-highlights the corresponding chunk. The outline toggle on the left collapses/expands PDF bookmarks and thumbnails.",
    },
    "reader.welcome.s23_h":           { zh: "Notes — structured note generation", en: "Notes — structured note generation" },
    "reader.welcome.s23_p":           {
      zh: "Notes tab → click \"Generate Notes\" → per-file streaming LaTeX note generation + a review pass for polish. KaTeX renders math in-browser. If `tectonic` is installed, a one-click compile to PDF is available. Each section is independently cached — re-generating only touches new content. The force-regenerate button bypasses the cache.", en: "Notes tab → click \"Generate Notes\" → per-file streaming LaTeX note generation + a review pass for polish. KaTeX renders math in-browser. If `tectonic` is installed, a one-click compile to PDF is available. Each section is independently cached — re-generating only touches new content. The force-regenerate button bypasses the cache.",
    },
    "reader.welcome.s24_h":           { zh: "Knowledge Graph — editable concept map", en: "Knowledge Graph — editable concept map" },
    "reader.welcome.s24_p":           {
      zh: "Mindmap tab shows concepts + relations auto-extracted from the course materials (two-stage: topics → leaf concepts), laid out interactively with d3-force. Double-click to edit, shift-drag to add an edge, press N for a child node, Del to remove. Manual edits are stored as an overlay on top of automatic extraction — re-extraction never clobbers your handiwork.", en: "Mindmap tab shows concepts + relations auto-extracted from the course materials (two-stage: topics → leaf concepts), laid out interactively with d3-force. Double-click to edit, shift-drag to add an edge, press N for a child node, Del to remove. Manual edits are stored as an overlay on top of automatic extraction — re-extraction never clobbers your handiwork.",
    },
    "reader.welcome.s25_h":           { zh: "Exam Prep — self-evolving question bank", en: "Exam Prep — self-evolving question bank" },
    "reader.welcome.s25_p":           {
      zh: "Exam Prep tab: auto-extracts course topics, generates a set of questions per topic (multiple choice + short answer), grades with AI. **For every wrong answer, the system auto-generates fresh variants targeting that topic** and adds them to the bank — the more you practice, the more focused the bank gets on your weak spots. Per-topic mastery is tracked.", en: "Exam Prep tab: auto-extracts course topics, generates a set of questions per topic (multiple choice + short answer), grades with AI. **For every wrong answer, the system auto-generates fresh variants targeting that topic** and adds them to the bank — the more you practice, the more focused the bank gets on your weak spots. Per-topic mastery is tracked.",
    },

    // 3. Advanced
    "reader.welcome.h3":              { zh: "Advanced", en: "Advanced" },
    "reader.welcome.s31_h":           { zh: "Cross-course retrieval", en: "Cross-course retrieval" },
    "reader.welcome.s31_p":           {
      zh: "Click \"All Courses\" at the top of the sidebar (the default) to have the Assistant retrieve across every uploaded course at once. Useful for end-of-term review, treating the whole semester as one KB. Single-course scoping is one click away.", en: "Click \"All Courses\" at the top of the sidebar (the default) to have the Assistant retrieve across every uploaded course at once. Useful for end-of-term review, treating the whole semester as one KB. Single-course scoping is one click away.",
    },
    "reader.welcome.s32_h":           { zh: "Switch embedding model", en: "Switch embedding model" },
    "reader.welcome.s32_p":           {
      zh: "Settings → Embedding: three presets — local MiniLM (multilingual, zero-config, 384-dim), OpenAI text-embedding-3-large (API, 3072-dim, strongest for ZH-EN cross-lingual), BGE-M3 (local, strong multilingual, 1024-dim, ~2GB first download). Switching is a path-route, not a rebuild: each preset keeps its own FAISS namespace — switching back to a previous preset is instant.", en: "Settings → Embedding: three presets — local MiniLM (multilingual, zero-config, 384-dim), OpenAI text-embedding-3-large (API, 3072-dim, strongest for ZH-EN cross-lingual), BGE-M3 (local, strong multilingual, 1024-dim, ~2GB first download). Switching is a path-route, not a rebuild: each preset keeps its own FAISS namespace — switching back to a previous preset is instant.",
    },
    "reader.welcome.s33_h":           { zh: "CLI batch processing", en: "CLI batch processing" },
    "reader.welcome.s33_p":           {
      zh: "scripts/ directory: `ingest_course.py` batch-ingest a directory, `build_indices.py` rebuild FAISS/BM25 indices, `reembed_all.py` re-embed everything under the current preset. Useful for bulk-migrating an existing library.", en: "scripts/ directory: `ingest_course.py` batch-ingest a directory, `build_indices.py` rebuild FAISS/BM25 indices, `reembed_all.py` re-embed everything under the current preset. Useful for bulk-migrating an existing library.",
    },

    // 4. Troubleshooting
    "reader.welcome.h4":              { zh: "Troubleshooting", en: "Troubleshooting" },
    "reader.welcome.s41_p":           {
      zh: "Upload stuck? Check server logs (`tail -f /tmp/nano-server.log`) to see whether mineru is actually grinding or genuinely hung. The frontend polls `/api/upload/status/<task_id>` every 1.5 s.", en: "Upload stuck? Check server logs (`tail -f /tmp/nano-server.log`) to see whether mineru is actually grinding or genuinely hung. The frontend polls `/api/upload/status/<task_id>` every 1.5 s.",
    },
    "reader.welcome.s42_p":           {
      zh: "Wrong file in the answer's citation? The topbar's \"active source\" chip may be over-constraining; or re-extract the course (Settings → reindex). If that fails, check `/api/sources/<course_id>` — does the chunk count match what you expect?", en: "Wrong file in the answer's citation? The topbar's \"active source\" chip may be over-constraining; or re-extract the course (Settings → reindex). If that fails, check `/api/sources/<course_id>` — does the chunk count match what you expect?",
    },
    "reader.welcome.s43_p":           {
      zh: "Formulas or tables missing? That deck was extracted with PyMuPDF (the default), which drops math. Delete + re-upload the course and pick MinerU in the Course Picker; or change the engine which triggers a re-extract (the old chunks are dropped).", en: "Formulas or tables missing? That deck was extracted with PyMuPDF (the default), which drops math. Delete + re-upload the course and pick MinerU in the Course Picker; or change the engine which triggers a re-extract (the old chunks are dropped).",
    },
    "reader.welcome.s44_p":           {
      zh: "Provider API failing? In Settings, click the \"Test\" button on that provider's row (5-second timeout ping) to see whether it's 401 / timeout / network. Prefer `env:VAR` for `api_key_ref` so the key stays in .env; use `literal:` only when env vars aren't available.", en: "Provider API failing? In Settings, click the \"Test\" button on that provider's row (5-second timeout ping) to see whether it's 401 / timeout / network. Prefer `env:VAR` for `api_key_ref` so the key stays in .env; use `literal:` only when env vars aren't available.",
    },
    "assistant.step_retrieving":      { zh: "Retrieving relevant passages", en: "Retrieving relevant passages" },
    "assistant.step_generating":      { zh: "Generating answer", en: "Generating answer" },
    "assistant.step_formatting":      { zh: "Formatting response", en: "Formatting response" },
    "assistant.sug.summarize":        { zh: "Summarize this course", en: "Summarize this course" },
    "assistant.sug.key_concepts":     { zh: "What are the key concepts?", en: "What are the key concepts?" },
    "assistant.sug.list_defs":        { zh: "List all definitions", en: "List all definitions" },
    "assistant.sug.gen_notes":        { zh: "Generate study notes", en: "Generate study notes" },
    "assistant.sug.gen_quiz":         { zh: "Generate quiz", en: "Generate quiz" },
    "assistant.sug.build_kg":         { zh: "Build knowledge graph", en: "Build knowledge graph" },
    "assistant.sug.exam_analysis":    { zh: "Exam analysis", en: "Exam analysis" },
    "assistant.sug.course_report":    { zh: "Course report", en: "Course report" },
    "assistant.sug.mastery":          { zh: "Mastery dashboard", en: "Mastery dashboard" },
    "assistant.sug.rewrite_shorter":  { zh: "Rewrite shorter", en: "Rewrite shorter" },
    "assistant.sug.add_examples":     { zh: "Add worked examples", en: "Add worked examples" },
    "assistant.sug.quiz_from_notes":  { zh: "Generate quiz from notes", en: "Generate quiz from notes" },
    "assistant.sug.what_concept":     { zh: "What is this concept?", en: "What is this concept?" },
    "assistant.sug.find_prereqs":     { zh: "Find prerequisites", en: "Find prerequisites" },
    "assistant.sug.explain_rels":     { zh: "Explain relationships", en: "Explain relationships" },
    "assistant.sug.new_quiz":         { zh: "Generate new quiz", en: "Generate new quiz" },
    "assistant.sug.focus_weak":       { zh: "Focus on weak areas", en: "Focus on weak areas" },
    "assistant.sug.make_harder":      { zh: "Make it harder", en: "Make it harder" },
    "assistant.sug.explain_answers":  { zh: "Explain the answers", en: "Explain the answers" },
    "assistant.action.building_kg":   { zh: "Building knowledge graph…", en: "Building knowledge graph…" },
    "assistant.action.gen_notes":     { zh: "Generating study notes…", en: "Generating study notes…" },
    "assistant.action.gen_quiz":      { zh: "Generating practice quiz…", en: "Generating practice quiz…" },

    // ── tweaks panel ──
    "tweaks.close":                   { zh: "Close tweaks", en: "Close tweaks" },

    // ── settings badges + section headers + body copy ──
    "settings.badge.configured":      { zh: "Configured", en: "Configured" },
    "settings.badge.unconfigured":    { zh: "Not configured", en: "Not configured" },
    "settings.badge.loading":         { zh: "Loading…", en: "Loading…" },
    "settings.head_sub":              {
      zh: "Central preferences page. API keys + model IDs live in the server's .env — this page only shows status. Edit .env directly to change keys / default models.", en: "Central preferences page. API keys + model IDs live in the server's .env — this page only shows status. Edit .env directly to change keys / default models.",
    },

    "settings.section.ai":            { zh: "AI Backend & Models", en: "AI Backend & Models" },
    "settings.section.ai_hint":       {
      zh: "Add / edit / remove LLM providers here · no restart needed · prefer env:VAR refs over literal keys", en: "Add / edit / remove LLM providers here · no restart needed · prefer env:VAR refs over literal keys",
    },
    "settings.providers.col.label":   { zh: "Name", en: "Name" },
    "settings.providers.col.kind":    { zh: "Kind", en: "Kind" },
    "settings.providers.col.model":   { zh: "Model", en: "Model" },
    "settings.providers.col.base_url":{ zh: "Base URL", en: "Base URL" },
    "settings.providers.col.status":  { zh: "Status", en: "Status" },
    "settings.providers.col.actions": { zh: "Actions", en: "Actions" },
    "settings.providers.kind.openai_compat":        { zh: "OpenAI-compatible", en: "OpenAI-compatible" },
    "settings.providers.kind.openai_compat_local":  { zh: "Local (OpenAI-compatible)", en: "Local (OpenAI-compatible)" },
    "settings.providers.kind.anthropic":            { zh: "Anthropic Claude", en: "Anthropic Claude" },
    "settings.providers.badge.default":     { zh: "default", en: "default" },
    "settings.providers.badge.key_ok":      { zh: "key set", en: "key set" },
    "settings.providers.badge.key_missing": { zh: "no key", en: "no key" },
    "settings.providers.badge.disabled":    { zh: "disabled", en: "disabled" },
    "settings.providers.action.test":       { zh: "Test", en: "Test" },
    "settings.providers.action.edit":       { zh: "Edit", en: "Edit" },
    "settings.providers.action.delete":     { zh: "Delete", en: "Delete" },
    "settings.providers.action.set_default":{ zh: "Set default", en: "Set default" },
    "settings.providers.action.cancel":     { zh: "Cancel", en: "Cancel" },
    "settings.providers.action.save":       { zh: "Save", en: "Save" },
    "settings.providers.add":               { zh: "+ Add provider", en: "+ Add provider" },
    "settings.providers.form.id":           { zh: "ID (lowercase letters, digits, -)", en: "ID (lowercase letters, digits, -)" },
    "settings.providers.form.label":        { zh: "Display name", en: "Display name" },
    "settings.providers.form.api_key_ref":  { zh: "API key ref (env:VAR or literal:...; prefer env)", en: "API key ref (env:VAR or literal:...; prefer env)" },
    "settings.providers.form.base_url":     { zh: "Base URL (required for OpenAI-compatible)", en: "Base URL (required for OpenAI-compatible)" },
    "settings.providers.form.preset":       { zh: "Vendor preset (one-click fills base URL / model / key ref)", en: "Vendor preset (one-click fills base URL / model / key ref)" },
    "settings.providers.preset.custom":     { zh: "Custom (manual)", en: "Custom (manual)" },
    "settings.providers.api_key.label":     { zh: "API key", en: "API key" },
    "settings.providers.api_key.placeholder": { zh: "sk-... paste your API key", en: "sk-... paste your API key" },
    "settings.providers.api_key.inherits_env": {
      zh: "Leave blank to read from env var {var} (set in .env). Paste a key here to override.", en: "Leave blank to read from env var {var} (set in .env). Paste a key here to override.",
    },
    "settings.providers.api_key.inherits_literal": {
      zh: "Leave blank to keep the currently stored key. Paste here to replace.", en: "Leave blank to keep the currently stored key. Paste here to replace.",
    },
    "settings.providers.api_key.literal_warn": {
      zh: "Stored inline in artifacts/providers.json (file mode 0600, owner-only).", en: "Stored inline in artifacts/providers.json (file mode 0600, owner-only).",
    },
    "settings.providers.test.running":      { zh: "Testing…", en: "Testing…" },
    "settings.providers.test.ok":           { zh: "✓ {ms}ms", en: "✓ {ms}ms" },
    "settings.providers.test.fail":         { zh: "✗ {err}", en: "✗ {err}" },
    "settings.providers.confirm_delete":    { zh: "Delete provider {id}?", en: "Delete provider {id}?" },
    "settings.providers.error":             { zh: "Operation failed: {msg}", en: "Operation failed: {msg}" },
    "settings.providers.empty":             { zh: "No providers yet · add one with the form below", en: "No providers yet · add one with the form below" },
    "settings.providers.api_key_ref_disabled_hint": {
      zh: "(leave blank to keep current value)", en: "(leave blank to keep current value)",
    },
    "settings.tag.main_path":         { zh: "Primary", en: "Primary" },
    "settings.field.model":           { zh: "Model", en: "Model" },
    "settings.field.base_url":        { zh: "base URL", en: "base URL" },
    "settings.badge.unconfigured_claude":  { zh: "ANTHROPIC_API_KEY not set", en: "ANTHROPIC_API_KEY not set" },
    "settings.badge.unconfigured_local":   { zh: "LOCAL_LLM_BASE_URL not set", en: "LOCAL_LLM_BASE_URL not set" },
    "settings.local_tag":             { zh: "Ollama / vLLM / LM Studio", en: "Ollama / vLLM / LM Studio" },
    "settings.local_setup_hint": {
      zh: "Set LOCAL_LLM_BASE_URL + LOCAL_LLM_MODEL in .env to enable a local model", en: "Set LOCAL_LLM_BASE_URL + LOCAL_LLM_MODEL in .env to enable a local model",
    },
    "settings.local_endpoint":        { zh: "endpoint", en: "endpoint" },

    "settings.section.embedding":     { zh: "Embedding Model", en: "Embedding Model" },
    "settings.section.embedding_hint": {
      zh: "Switching triggers a background rebuild · Switching back is instant (each preset keeps its own index)", en: "Switching triggers a background rebuild · Switching back is instant (each preset keeps its own index)",
    },
    "settings.rebuild.running_title": { zh: "Rebuilding index", en: "Rebuilding index" },
    "settings.rebuild.preset":        { zh: "Preset", en: "Preset" },
    "settings.rebuild.progress":      { zh: "Progress", en: "Progress" },
    "settings.rebuild.current_course":{ zh: "Current", en: "Current" },
    "settings.rebuild.running_hint": {
      zh: "Chat stays usable, but semantic search on un-rebuilt courses temporarily falls back to BM25-only.", en: "Chat stays usable, but semantic search on un-rebuilt courses temporarily falls back to BM25-only.",
    },
    "settings.rebuild.done":          { zh: "✓ Index rebuilt to {preset} ({n} courses)", en: "✓ Index rebuilt to {preset} ({n} courses)" },
    "settings.rebuild.partial_title": { zh: "⚠ Partial rebuild failed", en: "⚠ Partial rebuild failed" },
    "settings.rebuild.partial_count": { zh: "({done}/{total} completed)", en: "({done}/{total} completed)" },
    "settings.rebuild.failed_label":  { zh: "Failed courses:", en: "Failed courses:" },
    "settings.rebuild.partial_hint":  {
      zh: "Re-select this preset to retry, or check the server log.", en: "Re-select this preset to retry, or check the server log.",
    },
    "settings.rebuild.error":         { zh: "Rebuild failed: {msg}", en: "Rebuild failed: {msg}" },
    "settings.embed.switch_failed":   { zh: "Switch failed: {msg}", en: "Switch failed: {msg}" },
    "settings.preset.tag_api":        { zh: "API", en: "API" },
    "settings.preset.tag_local":      { zh: "Local", en: "Local" },
    "settings.preset.switching":      { zh: "Switching…", en: "Switching…" },
    "settings.preset.unconfigured":   { zh: "EMBEDDING_API_KEY not set", en: "EMBEDDING_API_KEY not set" },
    "settings.preset.first_download": { zh: "First download ~{gb} GB", en: "First download ~{gb} GB" },
    "settings.preset.custom_hint": {
      zh: "⚠ Current EMBEDDING_MODEL is a custom env value ({model}), not a preset. Picking a preset persists the choice and overrides the env default.", en: "⚠ Current EMBEDDING_MODEL is a custom env value ({model}), not a preset. Picking a preset persists the choice and overrides the env default.",
    },
    // Preset descriptions — keyed by preset_id so frontend can render the
    // right language. Backend config.py still ships a description string for
    // CLI / API consumers, but the UI overrides it with these.
    "settings.preset.desc.local_mini": {
      zh: "Local sentence-transformers · multilingual · zero config", en: "Local sentence-transformers · multilingual · zero config",
    },
    "settings.preset.desc.openai_large": {
      zh: "OpenAI-compatible /v1/embeddings · text-embedding-3-large · API key required", en: "OpenAI-compatible /v1/embeddings · text-embedding-3-large · API key required",
    },
    "settings.preset.desc.bge_m3": {
      zh: "BAAI/bge-m3 strong local multilingual model · ~2 GB first download", en: "BAAI/bge-m3 strong local multilingual model · ~2 GB first download",
    },
    "settings.row.embed_warm":        { zh: "Embedding warm-up", en: "Embedding warm-up" },
    "settings.warm.warming":          { zh: "warming…", en: "warming…" },
    "settings.warm.ok":               { zh: "ok", en: "ok" },
    "settings.warm.failed":           { zh: "failed", en: "failed" },
    "settings.row.tectonic":          { zh: "Tectonic (PDF compile)", en: "Tectonic (PDF compile)" },
    "settings.row.pptx_pdf":          { zh: "PPTX → PDF (LibreOffice)", en: "PPTX → PDF (LibreOffice)" },
    "settings.badge.available":       { zh: "Available", en: "Available" },
    "settings.badge.unavailable":     { zh: "Not installed", en: "Not installed" },

    "settings.section.appearance":    { zh: "Appearance", en: "Appearance" },
    "settings.section.appearance_hint":{ zh: "Stored in your browser", en: "Stored in your browser" },
    "settings.theme_label":           { zh: "Theme", en: "Theme" },
    "settings.theme.paper":           { zh: "Paper", en: "Paper" },
    "settings.theme.paper_hint":      { zh: "Daytime default · warm academic white", en: "Daytime default · warm academic white" },
    "settings.theme.dark":            { zh: "Dark", en: "Dark" },
    "settings.theme.dark_hint":       { zh: "Warm graphite · cool cyan accent", en: "Warm graphite · cool cyan accent" },
    "settings.theme.auto":            { zh: "Auto", en: "Auto" },
    "settings.theme.auto_hint":       { zh: "Follow system", en: "Follow system" },
    "settings.theme_current":         { zh: "Current: {theme}", en: "Current: {theme}" },
    "settings.theme_auto_current":    {
      zh: "Auto · now = {resolved} (follows system prefers-color-scheme)", en: "Auto · now = {resolved} (follows system prefers-color-scheme)",
    },
    "settings.density_label":         { zh: "Density", en: "Density" },
    "settings.density.compact":       { zh: "Compact", en: "Compact" },
    "settings.density.comfortable":   { zh: "Comfortable", en: "Comfortable" },
    "settings.density.airy":          { zh: "Airy", en: "Airy" },
    "settings.density_hint":          { zh: "Controls line height / card padding scale", en: "Controls line height / card padding scale" },
    "settings.basesize_label":        { zh: "Base font size", en: "Base font size" },

    "settings.section.user_prefs":    { zh: "User preferences", en: "User preferences" },
    "settings.lang_row_label":        { zh: "Reply language", en: "Reply language" },
    "settings.persona_label":         { zh: "Persona (assistant name)", en: "Persona (assistant name)" },
    "settings.persona_count_hint":    { zh: "{n}/40 chars · appears in the system prompt", en: "{n}/40 chars · appears in the system prompt" },
    "settings.persona_privacy_warn":  {
      zh: "⚠ This name is sent to the LLM with every request · don't enter real name / email / phone or other private info", en: "⚠ This name is sent to the LLM with every request · don't enter real name / email / phone or other private info",
    },
    "settings.persona_icon_label":    { zh: "Assistant icon", en: "Assistant icon" },
    "settings.persona_icon_hint":     {
      zh: "Paste an emoji (macOS: 🌐/Fn + E, or ⌃⌘Space) · leave empty to use the first letter of the name", en: "Paste an emoji (macOS: 🌐/Fn + E, or ⌃⌘Space) · leave empty to use the first letter of the name",
    },
    "settings.persona_icon_clear":    { zh: "Clear", en: "Clear" },
    "settings.hidden_courses_label":  { zh: "Hidden courses", en: "Hidden courses" },
    "settings.hidden_courses_count":  { zh: "{n} courses hidden (frontend-only; backend data is preserved)", en: "{n} courses hidden (frontend-only; backend data is preserved)" },
    "settings.hidden_courses_unhide": { zh: "Show all", en: "Show all" },
    "settings.hidden_courses_none":   { zh: "none", en: "none" },
    "settings.reset_row_label":       { zh: "Reset all preferences", en: "Reset all preferences" },
    "settings.reset_btn":             { zh: "Reset (language / backend / persona)", en: "Reset (language / backend / persona)" },
    "settings.reset_hint":            { zh: "Page reloads; you'll be asked for language again on next launch", en: "Page reloads; you'll be asked for language again on next launch" },

    "settings.section.cache":         { zh: "Local cache (localStorage)", en: "Local cache (localStorage)" },
    "settings.section.cache_hint":    { zh: "{bytes} used · browser limit ~5 MB", en: "{bytes} used · browser limit ~5 MB" },
    "settings.cache.global_keys":     { zh: "Global pref keys", en: "Global pref keys" },
    "settings.cache.course_cache":    { zh: "Course cache", en: "Course cache" },
    "settings.cache.other_keys":      { zh: "Other keys", en: "Other keys" },
    "settings.cache.th_course":       { zh: "Course", en: "Course" },
    "settings.cache.th_keys":         { zh: "Keys", en: "Keys" },
    "settings.cache.th_bytes":        { zh: "Size", en: "Size" },
    "settings.cache.clear_one":       { zh: "Clear", en: "Clear" },
    "settings.cache.rescan":          { zh: "Rescan", en: "Rescan" },
    "settings.cache.clear_all":       { zh: "Clear all app cache (preferences kept)", en: "Clear all app cache (preferences kept)" },

    "settings.section.system":        { zh: "System status", en: "System status" },
    "settings.row.courses":           { zh: "Active courses", en: "Active courses" },
    "settings.row.chunks":            { zh: "Indexed chunks total", en: "Indexed chunks total" },
    "settings.row.tokens":            { zh: "Cumulative tokens", en: "Cumulative tokens" },
    "settings.tokens_value":          { zh: "in {in_} · out {out_}", en: "in {in_} · out {out_}" },

    // ── topbar tabs + course dropdown ──
    "tab.reader":                     { zh: "Reader", en: "Reader" },
    "tab.notes":                      { zh: "Notes", en: "Notes" },
    "tab.mindmap":                    { zh: "Knowledge Graph", en: "Knowledge Graph" },
    "tab.exam_prep":                  { zh: "Exam Prep", en: "Exam Prep" },
    "tab.history":                    { zh: "History", en: "History" },
    "topbar.all_courses":             { zh: "🌐 All Courses ({n} chunks)", en: "🌐 All Courses ({n} chunks)" },
    "topbar.course_option":           { zh: "{flag} {name} ({n} chunks)", en: "{flag} {name} ({n} chunks)" },
    "topbar.sources_btn":             { zh: "{n}/{total} sources", en: "{n}/{total} sources" },

    // ── status bar (bottom of app) ──
    "status.indexed":                 { zh: "Indexed", en: "Indexed" },
    "status.indexed_value":           { zh: "{n} courses · {chunks} chunks", en: "{n} courses · {chunks} chunks" },
    "status.backend":                 { zh: "Backend", en: "Backend" },
    "status.backend_none":            { zh: "none", en: "none" },
    "status.active":                  { zh: "Active", en: "Active" },
    "status.context":                 { zh: "Context", en: "Context" },
    "status.context_value":           { zh: "{n} / {total} sources", en: "{n} / {total} sources" },

    // ── library sidebar ──
    "library.sources":                { zh: "Sources", en: "Sources" },
    "library.in_context":             { zh: "{n} / {total} in context", en: "{n} / {total} in context" },
    "library.drop":                   { zh: "Drop files or click to upload", en: "Drop files or click to upload" },
    "library.collections":            { zh: "Collections", en: "Collections" },
    "library.row_toggle_tip":         { zh: "Click to toggle · Shift+Click to range-select", en: "Click to toggle · Shift+Click to range-select" },

    // ── assistant welcome / status ──
    "assistant.status.thinking":      { zh: "Thinking", en: "Thinking" },
    "assistant.status.drafting":      { zh: "Drafting", en: "Drafting" },
    "assistant.status.ready":         { zh: "Ready", en: "Ready" },
    "assistant.context_label":        { zh: "Context ·", en: "Context ·" },
    "assistant.who_welcome":          { zh: "{persona} · welcome", en: "{persona} · welcome" },
    "assistant.who_drafting":         { zh: "{persona} · drafting…", en: "{persona} · drafting…" },
    "assistant.welcome_with_course":  { zh: "Ready to help with {course}. Ask questions or click a suggestion below.", en: "Ready to help with {course}. Ask questions or click a suggestion below." },
    "assistant.welcome_no_course":    { zh: "Welcome! Select a course from the top bar, then ask me anything.", en: "Welcome! Select a course from the top bar, then ask me anything." },
    "assistant.generating_cursor":    { zh: "Generating", en: "Generating" },
    "assistant.action_check_tab":     { zh: "{label} Check the corresponding tab for results.", en: "{label} Check the corresponding tab for results." },

    // ── alerts ──
    "alert.pick_course":              { zh: "Please select a specific course first (not 'All Courses')", en: "Please select a specific course first (not 'All Courses')" },
  };

  function t(key, lang, vars) {
    const entry = STRINGS[key];
    let s = entry && entry[lang];
    if (s == null) s = entry && entry.en;
    if (s == null) s = key;
    if (vars && typeof s === "string") {
      for (const k in vars) {
        s = s.replace(new RegExp("\\{" + k + "\\}", "g"), String(vars[k]));
      }
    }
    return s;
  }

  // Bind module-time React reference if available, otherwise late-bind on first
  // call. React UMD is loaded synchronously before this file, so the eager path
  // is the usual one; the lazy fallback exists only so unit tests can import
  // i18n.js without a React polyfill.
  const _LangContext = (typeof React !== "undefined" && React.createContext)
    ? React.createContext("en")
    : null;

  window.I18N = { STRINGS, t };
  window.LangContext = _LangContext;
  // Stable per-language closure. Without React.useMemo, callers that do
  // `React.useMemo(..., [t])` would see a fresh fn ref every render and
  // re-run the memo body unconditionally — the optimization at e.g.
  // reader.jsx's 25-paragraph welcome doc would silently regress.
  window.useT = function () {
    const ctxLang = (_LangContext && typeof React !== "undefined")
      ? React.useContext(_LangContext)
      : "en";
    const lang = ctxLang || "en";
    if (typeof React !== "undefined" && React.useMemo) {
      return React.useMemo(
        () => function (key, vars) { return t(key, lang, vars); },
        [lang],
      );
    }
    return function (key, vars) { return t(key, lang, vars); };
  };
})();
