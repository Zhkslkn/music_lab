import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'as-social-share',
  template: `
    <div class="social-share-container">

    </div>
  `,
  styleUrls: ['./social-share.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialShareComponent {}
