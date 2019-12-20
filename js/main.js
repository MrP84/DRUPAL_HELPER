if (document.querySelector('.form-content')) {
  const container = document.querySelector('.form-content');
  const validator = container.querySelector('.form-content-validator');

  const writeDate = () => {
    let date = new Date();
    let today = '_';
    today += date.getFullYear();
    today += date.getMonth() + 1;
    today += date.getDate();

    return today;
  };

  const fillWithContent = (array, string) => {
    array.forEach((item) => {
      item.innerText = string;
    })
  };

  const today = writeDate();

  validator.addEventListener('click', (e) => {
    e.preventDefault();

    const projectInput = document.getElementById('project-name').value;
    const repoInput = document.getElementById('repo-name').value;
    const uriInput = (document.getElementById('uri-name').value) ? document.getElementById('uri-name').value : '';

    const projectName = projectInput.toLowerCase();
    const repoName = repoInput;
    //const baseName = projectName;
    const tempBaseName = projectName + today;
    const uriName = uriInput.length > 0 ? " --uri=" + uriInput : '';

    document.querySelector('.result-display').classList.add('visible');

    const baseItems = document.querySelectorAll('.base-name');
    const projectItems = document.querySelectorAll('.project-name');
    const uriItems = document.querySelectorAll('.uri-name');
    const repoItems = document.querySelectorAll('.repo-name');

    fillWithContent(repoItems, repoName);
    fillWithContent(uriItems, uriName);
    fillWithContent(projectItems, projectName);
    fillWithContent(baseItems, tempBaseName);

    if (document.queryCommandSupported('copy')) {

      const textToCopy = document.querySelectorAll('pre');

      textToCopy.forEach((item) => {

        const copyBtn = document.createElement('span');
        copyBtn.classList.add('button');

        item.appendChild(copyBtn);

      });

      const buttons = document.querySelectorAll('.button');

      buttons.forEach((item) => {
        item.addEventListener('click', () => {
          const range = document.createRange();
          const target = item.parentElement;
          let selection = window.getSelection();

          range.selectNode(target);
          selection.removeAllRanges();
          selection.addRange(range);

          try {
            const copied = document.execCommand('copy');
            if (copied) {
              const checked = document.createElement('div');
              checked.classList.add('checked');
              item.parentElement.appendChild(checked);
            }
          }
          catch (e) {
            console.log(e);
          }

          selection = window.getSelection();

          if (typeof selection.removeRange === 'function') {
            selection.removeRange(range);
          } else if (typeof selection.removeAllRanges === 'function') {
            selection.removeAllRanges();
          }
        })
      })
    }
  })
}


