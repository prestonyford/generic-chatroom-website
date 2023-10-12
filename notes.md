[README file](README.md)
# 9/13/2023
## What I learned from the [GitHub assignment](https://github.com/webprogramming260/.github/blob/main/profile/essentials/gitHub/gitHub.md)
- Merge conflicts only occur if the same line was edited
- GitLens helps to visualize commits

# 9/19/2023
- ssh command: ```ssh -i harmonykey260.pem ubuntu@44.194.122.235```
- The owner of a root domain can create any number of subdomains off the root domain. Each subdomain may resolve to a different IP address. So the owner of cs260.click can have subdomains for travel (travel.cs260.click), finance (finance.cs260.click), or a blog (blog.cs260.click).
- The DNS database records that facilitate the mapping of domain names to IP addresses come in several flavors. The main ones we are concerned with are the address (A) and the canonical name (CNAME) records. An A record is a straight mapping from a domain name to IP address. A CNAME record maps one domain name to another domain name. This acts as a domain name alias. You would use a CNAME to do things like map byu.com to the same IP address as byu.edu so that either one could be used.

# 9/26/2023
- CSS rules can be used as an atrribute to a single element, or applied to all elements of specific type in the file
- Usually instead of having all the stlyes at the top of an HTML file (big file!), link a <link> with href to a CSS file
- For example:
    ```css
    p {
        color: green;
    }
    ```
- font-size: 3em; means the text will be 3x the size as the parent
- Selectors
  - element
    - For all elements of the specified type
  - ID
    - IDs are for SINGLE elements. Not groups of.
  - class
    - Classes are for groups of elements
    - .login {} is the css for elements of the login class
  - element class
- Units
  - px
  - pt
  - %
  - em
  - rem
  - vw
  - vh
  - vmin
  - vmax

# 9/27/2023
- the action attribute of a form is where to send the form data when submitted

# 9/28/2023
- CSS
  - Rules?
    - None
    - Block, inherit dimensions of parent
    - Inline
    - Flex, spread out children evenly in box
    - Grid
- meta HTML tag
  - This tells phone browsers not to do any funky display stuff, should always add it to head
  - ```<meta name="viewport" content="width=device-width, initial-scale=1" />```
- CSS (media) Queries
  - if the query is true, then the inside of the query is done (for example, css rules defined inside the query will be applied)
- Aside elements can have a float css property
- minmax
- CSS frameworks
  - Link the stylesheets and scripts
  - Specify the class for each element to get the styles defined by the framework

 # 10/3/2023
 - You can link a document containing CSS rules using this html:
   - ```<link rel="stylesheet" href="styles.css" />```
 - Linking CSS must be done in the <head> element, just like other styles
 - CSS rules can apply to all elements with the wildcard *
 - Descendent combinators (in this case, it selects all h2 elements that are descendants of section elements:
```css
section h2 {
  color: #004400;
}
```
- Other types of combinators:

| Combinator       | Meaning                    | Example        | Description                                |
| ---------------- | -------------------------- | -------------- | ------------------------------------------ |
| Descendant       | A list of descendants      | `body section` | Any section that is a descendant of a body |
| Child            | A list of direct children  | `section > p`  | Any p that is a direct child of a section  |
| General sibling  | A list of siblings         | `p ~ div`      | Any p that has a div sibling               |
| Adjacent sibling | A list of adjacent sibling | `p + div`      | Any p that has an adjacent div sibling     |

ID selectors start with #
## Attribute selectors work based on html attributes:
```css
p[class='summary'] {
  color: red;
}
```
## Pseudo selectors based on things like mouse interactions:
```css
section:hover {
  border-left: solid 1em purple;
}
```
## Class selectors:
```css
.summary {
  font-weight: bold;
}
```
You can also combine the element name and class selectors to select all paragraphs with a class of summary.

```css
p.summary {
  font-weight: bold;
}
```
## Media Queries
```css
@media (orientation: portrait) {
  div {
    transform: rotate(270deg);
  }
}
```
# 10/3/2023 In Class: CSS and Javascript
- Try using Bootstrap in the startup
- JavaScript is for manipulating the DOM
- V8 is Chrome's JIT compiler
## Javascript
- Pull the JS into the HTML just like with CSS
  - <script src=''> </script> in head to link it, most common way
  - Script tag in body containing javascript inside it
  - Write it where you would normally call it
    - HTML attributes like:
      - onclick="sayHello()"
      - onclick="let i=1; i++; console.log(i)"
      - Good practice to use 'use strict' 

# 10/5/2023
- Prototype kinda refers to the interface of an object, what methods are available for it
- Keys in objects are typically of Symbol type, but they can also be string or number
- A dictionary is an "object"
- objects can have functions, etc. So objects refer to the key-value pair structures as well as instances of classes
- string interpolation with backticks: \`hello: ${a}\`
- Closures
  - Make a closure by having a function that returns a function
  - Context is kept. Surrounding scope

# 10/10/2023
## Javascript: Closures, Regex, Template Literals
- A closure is a function with its environment saved with it
- Debouncing uses a timeout to prevent something from happening too often

# 10/12/2023
- An array.reduce(p, c) combines all elements of an array to one variable. P is the acumulator, c is next item
- array.some(fn) returns true if at least 1 element is true in the fn
- objects can have functions
- Spread separates array vs rest combines into array
