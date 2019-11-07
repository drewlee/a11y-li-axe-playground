(function(){
  axe.configure({
    rules: [
      {
        id: 'role-img-alt',
        // Remove the svg exclusion from the default selector,
        // which is defined as [role='img']:not(svg):not(img):not(area):not(input):not(object).
        selector: '[role=\'img\']:not(img):not(area):not(input):not(object)'
      }
    ]
  });
})();