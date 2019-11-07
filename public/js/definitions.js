axe.configure({
  rules: [
    {
      id: 'link-text-title-duplicate',
      selector: 'a[title]:not([aria-label]):not([aria-labelledby])',
      metadata: {
        description: 'Ensures link text and title attribute are not duplicates',
        help: 'Title attribute must provide supplemental info instead of duplicating link text',
        // These should probably point to internal resources
        helpUrl: 'https://www.24a11y.com/2017/the-trials-and-tribulations-of-the-title-attribute/'
        // A couple of other good links:
        // https://www.w3.org/TR/WCAG20-TECHS/H33.html
        // https://www.searchenginejournal.com/how-to-use-link-title-attribute-correctly/#close
      },
      all: [],
      any: [],
      none: ['link-text-title-match']
    }
  ],
  checks: [
    {
      id: 'link-text-title-match',
      metadata: {
        impact: 'moderate',
        messages: {
          pass: 'Link text and title attribute are not duplicates',
          fail: 'Link text and title attribute are duplicates'
        }
      },
      evaluate: (node, options, virtualNode) => {
        const { sanitize, subtreeText, titleText } = axe.commons.text;
        // Sanitization normalizes for white space characters.
        // Gets link text content.
        const text = sanitize(subtreeText(virtualNode));
        // Gets title attribute value.
        const title = sanitize(titleText(node));
        return text === title;
      }
    }
  ]
});