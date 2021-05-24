const insertNewContactToCategories = (input, categories) => {
  const existCategoryIndex = categories.findIndex(
    ({ name }) => name === input.name
  );
  if (existCategoryIndex > -1) {
    const existSubCategoryIndex = categories[
      existCategoryIndex
    ].subCategories.findIndex(
      ({ name }) => name === input.subCategories[0].name
    );
    if (existSubCategoryIndex > -1) {
      //   check for duplicated contact
      const duplicatedContactIndex = categories[
        existCategoryIndex
      ].subCategories[existSubCategoryIndex].contacts.findIndex(
        ({ accountNumber }) =>
          accountNumber === input.subCategories[0].contacts[0].accountNumber
      );
      if (duplicatedContactIndex === -1)
        categories[existCategoryIndex].subCategories[
          existSubCategoryIndex
        ].contacts.push(input.subCategories[0].contacts[0]);
    } else {
      //   sub category not exist
      categories[existCategoryIndex].subCategories.push(input.subCategories[0]);
    }
  } else {
    // category not exist =>
    categories.push(input);
  }
  // console.log(JSON.stringify(categories, null, 2));
  return categories;
};
module.exports = { insertNewContactToCategories };
