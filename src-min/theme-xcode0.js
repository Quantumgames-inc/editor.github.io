define("ace/theme/xcode0",["require","exports","module","ace/lib/dom"],function(e,t,n){t.isDark=!1,t.cssClass="ace-xcode0",t.cssText=".ace-xcode0 .ace_gutter {background: var(--text-editor-light-color-gutter-background, #e8e8e8);color: var(--text-editor-light-color-gutter-color, rgba(50, 50, 50, 0.5))}.ace-xcode0 .ace_print-margin {width: 1px;background: #e8e8e8}.ace-xcode0 {background-color: var(--text-editor-light-color-background, #FFFFFF);color: #000000}.ace-xcode0 .ace_cursor {color: #000000}.ace-xcode0 .ace_marker-layer .ace_selection {background: #B5D5FF}.ace-xcode0.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px #FFFFFF;}.ace-xcode0 .ace_marker-layer .ace_step {background: rgb(198, 219, 174)}.ace-xcode0 .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid #BFBFBF}.ace-xcode0 .ace_marker-layer .ace_active-line {background: var(--text-editor-light-color-activehint, rgba(0, 0, 0, 0.071));}.ace-xcode0 .ace_gutter-active-line {color: var(--text-editor-light-color-active-gutter-color, rgba(50, 50, 50, 0.8)); background: var(--text-editor-light-color-active-gutter-background, transparent)}.ace-xcode0 .ace_marker-layer .ace_selected-word {border: 1px solid #B5D5FF}.ace-xcode0 .ace_constant.ace_language,.ace-xcode0 .ace_keyword,.ace-xcode0 .ace_meta,.ace-xcode0 .ace_variable.ace_language {color: var(--text-editor-light-color-keyword, #dc8842)}.ace-xcode0 .ace_operator {color: black !important}.ace-xcode0 .ace_invisible {color: #BFBFBF}.ace-xcode0 .ace_constant.ace_character,.ace-xcode0 .ace_constant.ace_other {color: #275A5E}.ace-xcode0 .ace_constant.ace_numeric {color: var(--text-editor-light-color-number, #6897BB)}.ace-xcode0 .ace_entity.ace_other.ace_attribute-name,.ace-xcode0 .ace_support.ace_constant,.ace-xcode0 .ace_support.ace_function {color: var(--text-editor-light-color-predefined, #9f73ae)}.ace-xcode0 .ace_fold {background-color: rgba(0, 0, 0, 0.3);border-color: #000000}.ace-xcode0 .ace_boolean {color: #dca500 !important}.ace-xcode0 .ace_entity.ace_name.ace_tag,.ace-xcode0 .ace_support.ace_class,.ace-xcode0 .ace_support.ace_type {color: #790EAD}.ace-xcode0 .ace_storage {color: var(--text-editor-light-color-keyword, #dc8842)}.ace-xcode0 .ace_string {color: var(--text-editor-light-color-string, #7B986A)}.ace-xcode0 .ace_comment {color: var(--text-editor-light-color-comment, #75715E)}.ace-xcode0 .ace_indent-guide {background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==) right repeat-y} .ace-xcode0 .ace_completion-meta{visibility: hidden;} .ace_line-hover {background-color: var(--text-editor-light-color-hinthover, inherit) !important; border: none !important}";var r=e("../lib/dom");r.importCssString(t.cssText,t.cssClass)});                (function() {
                    window.require(["ace/theme/xcode0"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();