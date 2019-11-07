axe.run((err, res = {}) => {
  if (err) {
    console.error(err);
  } else if (res.violations && res.violations.length) {
    res.violations.forEach(violation => {
      console.log(violation);
    });
  }
});
