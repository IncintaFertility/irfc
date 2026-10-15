// Follow the JSON response protocol in Zoho's generated WebForm code.
// An opaque response or a completed request alone does not establish acceptance.
export function initFeedbackForm() {
  const form = document.getElementById('feedback-form');
  if (!form) return;
  const button = form.querySelector('button[type="submit"]');
  const status = document.getElementById('feedback-status');
  const zh = form.dataset.locale === 'zh-hant';
  const label = button.textContent;
  let busy = false;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy || !form.reportValidity()) return;
    for (const name of ['NAME', 'COBJ5CF2']) {
      const field = form.elements.namedItem(name);
      if (!field.value.trim()) {
        field.setCustomValidity(zh ? '請填寫此欄位。' : 'Please complete this field.');
        field.reportValidity();
        field.addEventListener('input', () => field.setCustomValidity(''), { once: true });
        return;
      }
    }
    if (form.elements.namedItem('aG9uZXlwb3Q').value) return;
    busy = true;
    button.disabled = true;
    button.textContent = zh ? '提交中…' : 'Submitting…';
    status.textContent = '';
    try {
      const response = await fetch(form.action, {
        method: 'POST', body: new FormData(form), cache: 'no-cache',
        credentials: 'omit', signal: AbortSignal.timeout(20000),
      });
      if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error('Unconfirmed response');
      const data = await response.json();
      const captchaFailed = data.invalidCaptcha === true || data.invalidCaptcha === 'true';
      const accepted = data.actionsubmit === 'Splash Message' && !captchaFailed && data.success !== false && data.success !== 'false';
      if (!accepted) throw new Error('Submission not confirmed');
      form.reset();
      status.textContent = zh ? '謝謝，您的意見已提交。若留下聯絡資料，團隊可與您聯絡。' : 'Thank you. Your feedback has been submitted. If you left contact details, our team can contact you.';
      status.dataset.state = 'success';
    } catch {
      status.textContent = zh ? '無法確認提交結果，您的內容已保留。提交可能已送達；再次提交可能產生重複紀錄。您也可以透過診所電話聯絡我們。' : 'We could not confirm the submission. Your message is still here. It may have reached us; submitting again could create a duplicate. You can also contact us by clinic phone.';
      status.dataset.state = 'error';
    } finally {
      busy = false;
      button.disabled = false;
      button.textContent = label;
      status.focus();
    }
  });
}
