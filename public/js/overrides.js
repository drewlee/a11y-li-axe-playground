(function() {
  const imgAltId = 'image-alt'; // The id of the rule we're overriding.
  // axe._audit contains an internal registry of all rule and check attributes.
  // We do this lookup so that we don't have to explicitly redefine all of the rule's checks.
  const imgAltRule = axe._audit.rules.filter((rule) => rule.id === imgAltId);
  // The `any` property defines all the checks that a rule executes.
  // The default checks are ['has-alt, 'aria-label', 'aria-labelledby', 'non-empty-title', 'role-presentation', 'role-none'].
  // We pluck out 'non-empty-title' so that this check no longer occurs for this rule, thus failing the rule.
  const noTitleChecks = imgAltRule[0].any.filter((check) => check !== 'non-empty-title');

  // Impact is defined on each check. The final impact level for the violation is determined by comparing all the checks that have failed.
  // As an exercise, let's override the impact level of the 'has-alt' check, which is 'critical' by default.
  const hasAltId = 'has-alt'; // The id of the check we're overriding.
  // Again, we do an internal lookup so that we don't have to explicitly redefine all of the check's metadata.
  const hasAltCheck = axe._audit.data.checks[hasAltId];

  // All overrides must be done on the axe.configure method
  axe.configure({
    rules: [
      {
        id: imgAltId,
        // This is effectively the same as doing
        // any: ['has-alt, 'aria-label', 'aria-labelledby', 'role-presentation', 'role-none']
        any: noTitleChecks
      }
    ],
    checks: [
      {
        id: hasAltId,
        metadata: {
          impact: 'minor',
          // Unfortunately, we can't just override the `impact` value. The `messages` properties must also be redefined, otherwise they end up blank.
          // This is why we initially execute an internal registy check to store the original values.
          // This is effectively the same as doing
          // messages: { pass: 'Element has an alt attribute', fail: 'Element does not have an alt attribute' }
          messages: hasAltCheck.messages
        }
      }
    ]
  });
})();