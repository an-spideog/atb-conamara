// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="translators_note.html">Translator&#39;s Note</a></li><li class="chapter-item expanded affix "><a href="introduction.html">Introduction</a></li><li class="chapter-item expanded affix "><a href="pronunciation_symbols.html">Pronunciation Symbols</a></li><li class="chapter-item expanded affix "><a href="spelling.html">Spelling</a></li><li class="chapter-item expanded "><a href="the_dialect.html"><strong aria-hidden="true">1.</strong> The Dialect</a></li><li class="chapter-item expanded "><a href="pronunciation_of_vowels.html"><strong aria-hidden="true">2.</strong> Pronunciation of Vowels</a></li><li class="chapter-item expanded "><a href="pronunciation_of_consonants.html"><strong aria-hidden="true">3.</strong> Pronunciation of Consonants</a></li><li class="chapter-item expanded "><a href="pronunciation_various_words.html"><strong aria-hidden="true">4.</strong> Pronunciation: Various Words</a></li><li class="chapter-item expanded "><a href="initial_mutations.html"><strong aria-hidden="true">5.</strong> Initial Mutations</a></li><li class="chapter-item expanded "><a href="nouns.html"><strong aria-hidden="true">6.</strong> Nouns</a></li><li class="chapter-item expanded "><a href="adjectives.html"><strong aria-hidden="true">7.</strong> Adjectives</a></li><li class="chapter-item expanded "><a href="numbers.html"><strong aria-hidden="true">8.</strong> Numbers</a></li><li class="chapter-item expanded "><a href="pronouns.html"><strong aria-hidden="true">9.</strong> Pronouns</a></li><li class="chapter-item expanded "><a href="simple_prepositions.html"><strong aria-hidden="true">10.</strong> Simple Prepositions</a></li><li class="chapter-item expanded "><a href="compound_prepositions.html"><strong aria-hidden="true">11.</strong> Compound Prepositions</a></li><li class="chapter-item expanded "><a href="question_words.html"><strong aria-hidden="true">12.</strong> Question Words</a></li><li class="chapter-item expanded "><a href="regular_verbs.html"><strong aria-hidden="true">13.</strong> Regular Verbs</a></li><li class="chapter-item expanded "><a href="irregular_verbs.html"><strong aria-hidden="true">14.</strong> Irregular Verbs</a></li><li class="chapter-item expanded "><a href="the_copula.html"><strong aria-hidden="true">15.</strong> The Copula</a></li><li class="chapter-item expanded "><a href="compound_tenses.html"><strong aria-hidden="true">16.</strong> Compound Tenses</a></li><li class="chapter-item expanded "><a href="vocabulary.html"><strong aria-hidden="true">17.</strong> Vocabulary</a></li><li class="chapter-item expanded affix "><a href="mini_dictionary.html">Mini-Dictionary</a></li><li class="chapter-item expanded affix "><a href="verb_tables.html">Appendix A: Verb tables</a></li><li class="chapter-item expanded affix "><a href="aran_irish.html">Appendix B: Aran Irish</a></li><li class="chapter-item expanded affix "><a href="bibliography.html">Bibliography</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
