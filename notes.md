[README file](README.md)
# 9/13/2023
## What I learned from the [GitHub assignment](https://github.com/webprogramming260/.github/blob/main/profile/essentials/gitHub/gitHub.md)
- Merge conflicts only occur if the same line was edited
- GitLens helps to visualize commits

# 9/19/2023
- ssh command: ssh -i harmonykey260.pem ubuntu@44.194.122.235
- The owner of a root domain can create any number of subdomains off the root domain. Each subdomain may resolve to a different IP address. So the owner of cs260.click can have subdomains for travel (travel.cs260.click), finance (finance.cs260.click), or a blog (blog.cs260.click).
- The DNS database records that facilitate the mapping of domain names to IP addresses come in several flavors. The main ones we are concerned with are the address (A) and the canonical name (CNAME) records. An A record is a straight mapping from a domain name to IP address. A CNAME record maps one domain name to another domain name. This acts as a domain name alias. You would use a CNAME to do things like map byu.com to the same IP address as byu.edu so that either one could be used.

# 9/26/2023
- CSS rules can be used as an atrribute to a single element, or applied to all elements of specific type in the file
- Usually instead of having all the stlyes at the top of an HTML file (big file!), link a <link> with href to a CSS file
- For example:
    p {
        color: green;
    }
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
  - This tells phone browsers not to do any funky display stuff
  - <meta name="viewport" content="width=device-width, initial-scale=1" />
- CSS (media) Queries
  - if the query is true, then the inside of the query is done (for example, css rules defined inside the query will be applied)
- Aside elements can have a float css property
- minmax
- CSS frameworks
  - Link the stylesheets and scripts
  - Specify the class for each element to get the styles defined by the framework
