Page({
  data: {
    email: '',
    phone: '',
  },

  async updateUserInfo() {
    const { email, phone } = this.data;
    try {
      const res = await wx.cloud.callFunction({
        name: 'user',
        data: {
          action: 'updateUserInfo',
          userInfo: { email, phone },
        },
      });

      if (res.result.success) {
        wx.showToast({ title: '信息更新成功', icon: 'success' });
      } else {
        wx.showToast({ title: '信息更新成功', icon: 'success' });
      }
    } catch (error) {
      wx.showToast({ title: '更新信息失败', icon: 'none' });
      console.error('更新信息失败:', error);
    }
  },
});
