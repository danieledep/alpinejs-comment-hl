when template language expressions are inside inline-alpinejs they are highlighted in liquid but not in twig


x-show="{{ is_showing }}"

eg: liquid tokens

{{2 chars
language	liquid
standard token type	Other
foreground	#ABB2BF
background	#282C34
contrast ratio	6.57
textmate scopes	punctuation.definition.tag.begin.liquid
meta.object.liquid
meta.attribute.alpine
meta.tag.structure.div.start.html
text.html.liquid
foreground	meta.tag

is_showing10 chars
language	liquid
standard token type	Other
foreground	#E06C75
background	#282C34
contrast ratio	4.38
textmate scopes	variable.other.liquid
meta.object.liquid
meta.attribute.alpine
meta.tag.structure.section.start.html
text.html.liquid
foreground	variable

twig tokens

{1 char
language	twig
standard token type	String
foreground	#98C379
background	#282C34
contrast ratio	6.95
textmate scopes	string.quoted.double.html
meta.attribute.alpine
meta.tag.block.any.html
text.html.twig
foreground	string

is_showing·}}14 chars
language	twig
standard token type	String
foreground	#98C379
background	#282C34
contrast ratio	6.95
textmate scopes	string.quoted.double.html
meta.attribute.alpine
meta.tag.inline.any.html
text.html.twig
foreground	string


With extension disabled

{{2 chars
language	twig
standard token type	String
foreground	#98C379
background	#282C34
contrast ratio	6.95
textmate scopes	punctuation.section.tag.twig
meta.tag.template.value.twig
string.quoted.double.html
meta.tag.block.any.html
text.html.twig
foreground	string.quoted.double punctuation
{ "foreground": "#98C379" }

is_showing10 chars
language	twig
standard token type	String
foreground	#E06C75
background	#282C34
contrast ratio	4.38
textmate scopes	variable.other.twig
meta.tag.template.value.twig
string.quoted.double.html
meta.tag.block.any.html
text.html.twig
foreground	variable